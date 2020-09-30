import { Injectable, OnDestroy } from '@angular/core';
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';
import { BehaviorSubject, EMPTY, fromEvent } from 'rxjs';
import { catchError, delay, first, map, pluck, tap } from 'rxjs/operators';
import { CommunicationService } from 'src/app/core/services/communication/communication.service';
import { Sensor } from '../../../sensors/model/response/sensor.model';
import { BaseSensor } from '../../model/base-sensor';
import { HttpService } from '../http/http.service';

@Injectable()
export class SensorService implements OnDestroy {
  private static readonly refreshDelay = 60000;

  private sensorsMap = new Map<string, Sensor>();
  private $sensors = new BehaviorSubject<Sensor[]>([]);
  private worker: Worker;
  private refreshStarted: boolean;

  constructor(private httpService: HttpService, private communicationService: CommunicationService) {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker('../../web-worker/sensor-update/sensor-update.worker.ts', { type: 'module' });
      this.worker.postMessage({
        command: 'configure',
        value: { refreshDelay: SensorService.refreshDelay, url: httpService.sensorsUrl }
      });

      fromEvent(this.worker, 'message')
        .pipe(
          untilDestroyed(this),
          pluck('data'),
          map((message: { success: boolean; response: any }) => {
            if (message.success) {
              return message.response;
            } else {
              throw Error(message.response);
            }
          }),
          tap((sensors: Sensor[]) => this.storeSensors(sensors)),
          catchError(error => {
            this.communicationService.error(`Error during refreshing sensors: ${error.message}`);
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  refresh() {
    if (!this.refreshStarted) {
      this.refreshStarted = true;

      if (this.worker) {
        this.worker.postMessage({ command: 'control', value: 'start' });
      } else {
        this.refreshRegular();
      }
    }
  }

  updateSensor(newSensor: BaseSensor) {
    this.httpService
      .updateSensor(newSensor)
      .pipe(
        tap(sensor => {
          const oldSensor = this.sensorsMap.get(sensor.address);
          oldSensor.factor = sensor.factor;
          oldSensor.name = sensor.name;
          oldSensor.units = sensor.units;
          oldSensor.value = sensor.value;
        })
      )
      .subscribe();
  }

  get sensors() {
    return this.$sensors.asObservable();
  }

  pauseRefresh() {
    if (this.worker) {
      this.worker.postMessage({ command: 'control', value: 'stop' });
    }
    this.refreshStarted = false;
  }

  private refreshRegular() {
    this.httpService
      .getSensors()
      .pipe(
        first(),

        tap(sensors => this.storeSensors(sensors)),
        delay(SensorService.refreshDelay)
      )
      .subscribe(() => {
        if (this.refreshStarted) {
          this.refreshRegular();
        }
      });
  }

  private storeSensors(sensors: Sensor[]): void {
    sensors.forEach(sensor => this.sensorsMap.set(sensor.address, sensor));
    this.$sensors.next(sensors);
  }

  ngOnDestroy() {
    if (this.worker) {
      this.worker.postMessage({ command: 'control', value: 'terminate' });
    }
  }
}
