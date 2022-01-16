import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Task } from '../../model/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {
  @Input()
  canEdit: boolean;

  @Input()
  tasks: Array<Readonly<Task>>;

  @Output()
  removeTask = new EventEmitter<Task>();

  @Output()
  createTask = new EventEmitter<void>();
}
