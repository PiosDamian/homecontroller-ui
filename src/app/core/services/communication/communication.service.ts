import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';
import { of } from 'rxjs';
import { BlockingQueue } from 'rxjs-blocking-queue';
import { delay, filter, first, tap } from 'rxjs/operators';
import { maxTimeoutValue } from 'src/app/core/constants/const';
import { v4 as uuidV4 } from 'uuid';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Alert, AlertType } from '../../model/alert.model';

@Injectable()
export class CommunicationService implements OnDestroy {
  private readonly blockingQueue = new BlockingQueue<Alert>();

  private spinnerCounter = 0;
  private dialogRef: MatDialogRef<LoadingComponent>;

  constructor(private dialog: MatDialog, snackBar: MatSnackBar, ngZone: NgZone) {
    this.blockingQueue.element.pipe(untilDestroyed(this)).subscribe(alert => {
      snackBar
        .open(alert.message, 'Zamknij', { duration: alert.timeout })
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
          msg = 'Coś poszło nie tak z wykonaniem żądania. Adres nie został odnaleziony';
          break;
        default:
          msg = error.statusText;
      }
    }
    this.addMessage(msg, AlertType.ERROR, timeout);
  }

  private addMessage(message: string, type: AlertType, timeout: number = 5000) {
    const currTimeout = Math.min(maxTimeoutValue, timeout);
    const alert: Alert = {
      message,
      timeout: currTimeout,
      type,
      id: uuidV4()
    };
    this.blockingQueue.push(alert);
  }

  ngOnDestroy() {}
}
