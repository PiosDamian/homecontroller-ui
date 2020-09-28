import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../../constants/endpoints';
import { BaseSensor } from '../../model/base-sensor';
import { Sensor } from '../../model/response/sensor.model';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(endpoints.sensors);
  }

  updateSensor(newSensor: BaseSensor): Observable<Sensor> {
    return this.http.post<Sensor>(endpoints.updateSensor, newSensor);
  }
}
