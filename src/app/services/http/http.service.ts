import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { endpoints } from 'src/app/constants/endpoints';
import { Sensor } from 'src/app/model/response/sensor.model';
import { Switcher } from 'src/app/model/response/switcher.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private router: Router) { }

  getSensors(): Observable<Sensor[]> {
    return this.http
      .get(endpoints.sensors)
      .pipe(map((ar: any[]) => ar.map(el => new Sensor(el))));
  }

  getSwitchers(): Observable<Switcher[]> {
    return this.http
      .get(endpoints.switchers)
      .pipe(map((ar: any[]) => ar.map(el => new Switcher(el))));
  }

  switch(address: number): Observable<void> {
    return this.http
      .get(endpoints.switch.replace('{address}', '' + address))
      .pipe(
        map(() => null)
      );
  }

  getStateObservable(id: string) {
    return new EventSource(this.router.createUrlTree([endpoints.registerListener], {
      queryParams: {
        id
      }
    }).toString());
  }
}
