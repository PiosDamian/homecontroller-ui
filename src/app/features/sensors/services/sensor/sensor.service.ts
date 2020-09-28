import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Sensor } from '../../../sensors/model/response/sensor.model';
import { BaseSensor } from '../../model/base-sensor';
import { HttpService } from '../http/http.service';

@Injectable()
export class SensorService implements OnDestroy {
  private $sensors = new BehaviorSubject<Sensor[]>([]);

  constructor(private httpService: HttpService) {
    this.refresh();
  }

  refresh() {
    this.httpService
      .getSensors()
      .pipe(first())
      .subscribe(sensors => this.$sensors.next(sensors));
  }

  updateSensor(newSensor: BaseSensor) {
    this.httpService.updateSensor(newSensor).pipe(tap(console.log)).subscribe();
  }

  get sensors() {
    return this.$sensors.asObservable();
  }

  ngOnDestroy() {}
}
