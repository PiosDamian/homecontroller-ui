import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoints } from '../../constants/endpoints';
import { Sensor } from '../../model/response/sensor.model';
import { Switcher } from '../../model/response/switcher.model';
import { SwitchersModule } from '../../switchers.module';

@Injectable({
  providedIn: SwitchersModule
})
export class HttpService {
  constructor(private http: HttpClient, private router: Router) {}

  getSensors(): Observable<Sensor[]> {
    return this.http.get(endpoints.sensors).pipe(map((ar: any[]) => ar.map(el => new Sensor(el))));
  }

  getSwitchers(): Observable<Switcher[]> {
    return this.http.get(endpoints.switchers).pipe(map((ar: any[]) => ar.map(el => new Switcher(el))));
  }

  switch(address: number): Observable<void> {
    return this.http.get(endpoints.switch.replace('{address}', '' + address)).pipe(map(() => null));
  }
}
