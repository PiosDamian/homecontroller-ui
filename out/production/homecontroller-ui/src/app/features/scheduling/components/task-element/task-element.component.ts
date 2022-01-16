import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Task } from '../../model/task';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskElementComponent {
  @Input()
  task: Task;

  @Output()
  removeTask = new EventEmitter<Task>();

  @Input()
  canEdit: boolean;
}
