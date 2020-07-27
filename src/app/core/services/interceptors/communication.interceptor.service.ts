import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassProvider, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { endpoints } from '../../constants/endpoints';
import { CommunicationService } from '../communication/communication.service';

@Injectable()
export class CommunicationInterceptorService implements HttpInterceptor {
  private static nonBlockingRequests = [endpoints.registerListener, endpoints.unregisterListener];

  constructor(private communicationService: CommunicationService) {}

  static addNonBlockingRequests(urls: string[]) {
    urls.forEach(url => CommunicationInterceptorService.nonBlockingRequests.push(url));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const showSpinner = !CommunicationInterceptorService.nonBlockingRequests.some(url => req.url.startsWith(url));
    if (showSpinner) {
      this.communicationService.showSpinner();
    }
    return next.handle(req).pipe(
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

export const communicationInterceptorProvider: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CommunicationInterceptorService,
  multi: true
};
