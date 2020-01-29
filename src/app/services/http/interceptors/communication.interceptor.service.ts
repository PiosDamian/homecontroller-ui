import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassProvider } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommunicationService } from '../../communication/communication.service';
import { endpoints } from 'src/app/constants/endpoints';

export class CommunicationInterceptorService implements HttpInterceptor {
  private nonBlockableRequests = [
    endpoints.switch.replace('{address}', ''),
    endpoints.registerListener,
    endpoints.unregisterListener
  ];

  constructor(private communicationService: CommunicationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const showSpinner = !this.nonBlockableRequests.some(url => req.url.startsWith(url));
    if (showSpinner) {
      this.communicationService.showSpinner();
    }
    return next.handle(req)
      .pipe(
        tap({
          error: (error: HttpErrorResponse) => this.communicationService.error(error),
          complete: () => {
            if (showSpinner) {
              this.communicationService.hideSpinner();
            }
          }
        })
      );
  }
}

export const communicationInterceptor: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CommunicationInterceptorService,
  multi: true
};
