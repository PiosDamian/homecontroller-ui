import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { maxTimeoutValue } from 'src/app/constants/const';
import { AlertType, Alert } from 'src/app/model/alert.model';
import { v4 as uuidV4 } from 'uuid';

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
    let msg: string;
    if (typeof (error) === 'string') {
      msg = error;
    } else {
      switch (error.status) {
        case 401: msg = 'Musisz się zalogować'; break;
        case 403: msg = 'Nie posiadasz wystarczających uprawnień do wykonania tej akcji'; break;
        case 404: msg = 'Coś poszło nie tak z wykonaniem rządania. Adres nie został odnaleziony'; break;
        default: msg = error.statusText;
      }
    }
    this.addMessage(msg, AlertType.ERROR, timeout);
  }

  get alerts() {
    return this.$alerts.asObservable();
  }

  get spinner() {
    return this.$spinner.asObservable();
  }

  private addMessage(message: string, type: AlertType, timeout: number = 5000) {
    const currTimeout = Math.min(maxTimeoutValue, timeout);
    const alert: Alert = {
      message,
      timeout: currTimeout,
      type,
      id: uuidV4()
    };
    this.$alerts.next([...this.$alerts.getValue(), alert]);
    this.createAlertTimeout(alert);
  }

  dismissAlert(alert: Alert) {
    const alerts = this.$alerts.getValue();
    const index = alerts.findIndex(curAlert => curAlert.id === alert.id);
    if (index > -1) {
      alerts.splice(index, 1);
    }
    this.$alerts.next(alerts);
  }

  private createAlertTimeout(alert: Alert) {
    setTimeout(() => this.dismissAlert(alert), alert.timeout);
  }
}

