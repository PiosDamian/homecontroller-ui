import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { ClassProvider, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { endpoints } from '../../../constants/endpoints';
import { CommunicationService } from '../../communication/communication.service';

@Injectable()
export class CommunicationInterceptor implements HttpInterceptor {
  private static nonBlockingRequests = [
    endpoints.registerListener,
    endpoints.unregisterListener
  ];

  constructor(private communicationService: CommunicationService) {}

  static addNonBlockingRequests(urls: string[]) {
    urls.forEach((url) =>
      CommunicationInterceptor.nonBlockingRequests.push(url)
    );
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const canShowSpinner = !CommunicationInterceptor.nonBlockingRequests.some(
      (url) => req.url.startsWith(url)
    );
    if (canShowSpinner) {
      this.communicationService.showSpinner();
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.communicationService.error(error);
        return throwError(error);
      }),
      finalize(() => {
        if (canShowSpinner) {
          this.communicationService.hideSpinner();
        }
      })
    );
  }
}

export const communicationInterceptorProvider: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CommunicationInterceptor,
  multi: true
};
