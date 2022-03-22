import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { getExpressionValue, Task } from '../../model/task';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskElementComponent implements OnChanges {
  @Input()
  task: Task;

  @Output()
  removeTask = new EventEmitter<Task>();

  @Input()
  canEdit: boolean;

  expression: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.expression = getExpressionValue(
      (changes.task.currentValue as Task).scheduleDefinition
    );
  }
}
