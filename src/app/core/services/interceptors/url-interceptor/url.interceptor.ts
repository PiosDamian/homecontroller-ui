import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassProvider, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        url: `/gateway${request.url.startsWith('/') ? '' : '/'}${request.url}`
      })
    );
  }
}

export const urlInterceptorProvider: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UrlInterceptor,
  multi: true
};
