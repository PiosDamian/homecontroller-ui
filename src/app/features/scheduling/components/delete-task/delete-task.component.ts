import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Task } from '../../model/task';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteTaskComponent {
  constructor(
    readonly dialogRef: MatBottomSheetRef<DeleteTaskComponent, boolean>,
    @Inject(MAT_BOTTOM_SHEET_DATA) readonly data: { task: Task }
  ) {}
}
