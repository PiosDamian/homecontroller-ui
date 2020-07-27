import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject } from 'rxjs';
import { Sensor } from 'src/app/model/response/sensor.model';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private $sensors = new BehaviorSubject<Sensor[]>([]);

  constructor(private httpService: HttpService) {
    httpService.getSensors()
      .pipe(
        first()
      )
      .subscribe(sensors => this.$sensors.next(sensors));
  }

  get sensors() {
    return this.$sensors.asObservable();
  }
}
