import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoints } from '../../constants/endpoints';
import { Switcher } from '../../model/response/switcher.model';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getSwitchers(): Observable<Switcher[]> {
    return this.http.get(endpoints.switchers).pipe(map((ar: any[]) => ar.map(el => new Switcher(el))));
  }

  switch(address: number): Observable<void> {
    return this.http.get(endpoints.switch.replace('{address}', '' + address)).pipe(map(() => null));
  }
}
