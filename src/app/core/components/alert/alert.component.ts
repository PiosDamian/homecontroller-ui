import { Component, HostListener, Inject, Optional } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Alert } from '../../model/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) @Optional() public data: Alert, private snackBarRef: MatSnackBarRef<AlertComponent>) {}

  @HostListener('click', ['$event'])
  private close(event: Event) {
    event.stopPropagation();
    this.snackBarRef.dismiss();
  }
}
