import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../model/task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteTaskComponent {
  constructor(
    readonly dialogRef: MatDialogRef<DeleteTaskComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) readonly data: { task: Task }
  ) {}
}
