import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { maxTimeoutValue } from 'src/app/constants/const';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private $spinner = new ReplaySubject<boolean>(1);
  private spinnerCounter = 0;

  private $alerts = new BehaviorSubject<any[]>([]);

  constructor() {
    this.$spinner.next(false);
  }

  showSpinner() {
    if (++this.spinnerCounter > 0) {
      this.$spinner.next(true);
    }
  }

  hideSpinner() {
    if (--this.spinnerCounter <= 0) {
      of(null)
        .pipe(
          delay(1)
        )
        .subscribe(
          () => this.$spinner.next(false)
        );
    }

    if (this.spinnerCounter === 0) {
      this.spinnerCounter = 0;
    }
  }

  info(info: string, timeout?: number) {
    this.addMessage(info, AlertType.INFO, timeout);
  }

  warning(warning: string, timeout?: number) {
    this.addMessage(warning, AlertType.WARNING, timeout);
  }

  error(error: string | HttpErrorResponse, timeout?: number) {
    if (typeof (error) === 'string') {
      this.addMessage(error, AlertType.ERROR, timeout);
    }
    // todo: resolve error response
  }

  get alerts() {
    return this.$alerts.asObservable();
  }

  get spinner() {
    return this.$spinner.asObservable();
  }

  private addMessage(message: string, type: AlertType, timeout: number = 5000) {
    const currTimeout = Math.min(maxTimeoutValue, timeout);
  }
}

export enum AlertType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}
