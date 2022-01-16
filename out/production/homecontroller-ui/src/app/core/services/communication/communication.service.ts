import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';
import { timer } from 'rxjs';
import { BlockingQueue } from 'rxjs-blocking-queue';
import { filter, first, tap } from 'rxjs/operators';
import { maxTimeoutValue } from 'src/app/core/constants/const';
import { AlertComponent } from '../../components/alert/alert.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Alert, AlertType } from '../../model/alert.model';

@Injectable()
export class CommunicationService implements OnDestroy {
  private readonly blockingQueue = new BlockingQueue<Alert>();

  private spinnerCounter = 0;
  private dialogRef: MatDialogRef<LoadingComponent>;

  constructor(private dialog: MatDialog, snackBar: MatSnackBar) {
    this.blockingQueue.element.pipe(untilDestroyed(this)).subscribe(alert => {
      snackBar
        .openFromComponent(AlertComponent, { duration: alert.timeout, data: alert })
        .afterDismissed()
        .pipe(first())
        .subscribe(() => this.blockingQueue.next());
    });
  }

  showSpinner() {
    if (++this.spinnerCounter > 0 && this.dialogRef == null) {
      this.dialogRef = this.dialog.open(LoadingComponent, { disableClose: true, width: '50vw' });
    }
  }

  hideSpinner() {
    if (--this.spinnerCounter <= 0) {
      timer(1)
        .pipe(
          filter(() => !!this.dialogRef),
          tap(() => this.dialogRef.close()),
          tap(() => (this.dialogRef = null))
        )
        .subscribe();
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
          msg = 'Coś poszło nie tak z wykonaniem żądania. Adres nie został odnaleziony';
          break;
        default:
          msg = error.statusText || 'Nieznany błąd';
      }
    }
    this.addMessage(msg, AlertType.ERROR, timeout);
  }

  private addMessage(message: string, type: AlertType, timeout: number = 5000) {
    const currTimeout = Math.min(maxTimeoutValue, timeout);
    const alert: Alert = {
      message,
      timeout: currTimeout,
      type
    };
    this.blockingQueue.push(alert);
  }

  ngOnDestroy() {}
}
