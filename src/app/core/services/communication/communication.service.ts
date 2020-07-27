import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { maxTimeoutValue } from 'src/app/core/constants/const';
import { v4 as uuidV4 } from 'uuid';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Alert, AlertType } from '../../model/alert.model';

@Injectable()
export class CommunicationService {
  private spinnerCounter = 0;
  private dialogRef: MatDialogRef<LoadingComponent>;

  private $alerts = new BehaviorSubject<any[]>([]);

  constructor(private dialog: MatDialog) {}

  showSpinner() {
    if (++this.spinnerCounter > 0 && this.dialogRef == null) {
      this.dialogRef = this.dialog.open(LoadingComponent, { disableClose: true, width: '50vw' });
    }
  }

  hideSpinner() {
    if (--this.spinnerCounter <= 0) {
      of(null)
        .pipe(
          delay(1),
          filter(() => !!this.dialogRef),
          tap(() => this.dialogRef.close()),
          tap(() => (this.dialogRef = null))
        )
        .subscribe();
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
    if (typeof error === 'string') {
      msg = error;
    } else {
      switch (error.status) {
        case 401:
          msg = 'Musisz się zalogować';
          break;
        case 403:
          msg = 'Nie posiadasz wystarczających uprawnień do wykonania tej akcji';
          break;
        case 404:
          msg = 'Coś poszło nie tak z wykonaniem rządania. Adres nie został odnaleziony';
          break;
        default:
          msg = error.statusText;
      }
    }
    this.addMessage(msg, AlertType.ERROR, timeout);
  }

  get alerts() {
    return this.$alerts.asObservable();
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
