import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { endpoints } from '../../constants/endpoints';
import { CoreModule } from '../../core.module';

@Injectable({
  providedIn: CoreModule
})
export class HttpService {
  constructor(private router: Router, private http: HttpClient) {}

  getEventsObservable(id: string) {
    return new EventSource(
      this.router
        .createUrlTree([endpoints.registerListener], {
          queryParams: {
            id
          }
        })
        .toString()
    );
  }

  unregisterEventsObservable(id: string) {
    return this.http.get<void>(endpoints.unregisterListener, { params: new HttpParams({ fromObject: { id } }) });
  }
}
