import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoints } from '../../constants/endpoints';
import { Switcher } from '../../model/response/switcher.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  getSwitchers(): Observable<Switcher[]> {
    return this.http
      .get(endpoints.switchers)
      .pipe(map((ar: any[]) => ar.map((el) => new Switcher(el))));
  }

  switch(address: number): Observable<void> {
    return this.http
      .get(endpoints.switch.replace('${address}', '' + address))
      .pipe(map(() => null));
  }

  createSwitcher(newSwitcher: Switcher): Observable<void> {
    return this.http
      .post(endpoints.createSwitcher, newSwitcher, { responseType: 'text' })
      .pipe(map(() => null));
  }

  updateSwitcher(updatedSwitcher: Switcher): Observable<void> {
    return this.http
      .put(endpoints.updateSwitcher, updatedSwitcher, { responseType: 'text' })
      .pipe(map(() => null));
  }

  deleteSwitcher(switcher: Switcher): Observable<void> {
    return this.http
      .delete(endpoints.switcher.replace('${address}', switcher.address + ''))
      .pipe(map(() => null));
  }

  reservedPins(): Observable<number[]> {
    return this.http.get<number[]>(endpoints.reservedPins);
  }
}
