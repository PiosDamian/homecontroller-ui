import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { endpoints } from '../../constants/endpoints';

@Injectable()
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
    if (id) {
      navigator.sendBeacon(`${endpoints.unregisterListener}?id=${id}`);
    }
  }
}
