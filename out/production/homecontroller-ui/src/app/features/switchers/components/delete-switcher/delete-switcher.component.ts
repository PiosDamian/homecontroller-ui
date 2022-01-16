import { Component, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-delete-switcher',
  templateUrl: './delete-switcher.component.html',
  styleUrls: ['./delete-switcher.component.scss']
})
export class DeleteSwitcherComponent {
  constructor(
    private readonly dialogRef: MatBottomSheetRef<
      DeleteSwitcherComponent,
      boolean
    >,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    readonly data?: { pinNumber?: number; name?: string }
  ) {}

  dismiss(result: boolean) {
    this.dialogRef.dismiss(result);
  }
}
