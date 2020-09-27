import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Sensor } from '../../../sensors/model/response/sensor.model';
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

  get sensors() {
    return this.$sensors.asObservable();
  }

  ngOnDestroy() {}
}
