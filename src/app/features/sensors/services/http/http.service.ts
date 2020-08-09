import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoints } from '../../constants/endpoints';
import { Sensor } from '../../model/response/sensor.model';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getSensors(): Observable<Sensor[]> {
    return this.http.get(endpoints.sensors).pipe(map((ar: any[]) => ar.map(el => new Sensor(el))));
  }
}
