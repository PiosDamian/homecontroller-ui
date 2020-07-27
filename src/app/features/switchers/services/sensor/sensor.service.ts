import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Sensor } from '../../model/response/sensor.model';
import { SwitchersModule } from '../../switchers.module';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: SwitchersModule
})
export class SensorService {
  private $sensors = new BehaviorSubject<Sensor[]>([]);

  constructor(private httpService: HttpService) {
    httpService
      .getSensors()
      .pipe(first())
      .subscribe(sensors => this.$sensors.next(sensors));
  }

  get sensors() {
    return this.$sensors.asObservable();
  }
}
