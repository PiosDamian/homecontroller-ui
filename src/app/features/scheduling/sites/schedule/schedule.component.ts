import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { combineLatest, Observable, of } from 'rxjs';
import { Task } from '../../model/task';
import { CAN_EDIT_TASKS } from '../../constants/injections-tokens';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../components/create-task/create-task.component';
import { filter, first, switchMap } from 'rxjs/operators';
import { DeleteTaskComponent } from '../../components/delete-task/delete-task.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  tasks$: Observable<Array<Readonly<Task>>>;

  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly matDialog: MatDialog,
    private readonly matBottomSheet: MatBottomSheet,
    @Inject(CAN_EDIT_TASKS) @Optional() readonly canEdit$ = of(false)
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.scheduleService.getTasks();
  }

  createTask() {
    combineLatest([
      this.scheduleService.getSensors().pipe(first()),
      this.scheduleService.getSwitchers().pipe(first())
    ])
      .pipe(
        first(),
        switchMap((data) =>
          this.matDialog
            .open(CreateTaskComponent, {
              data: {
                sensors: data[0],
                switchers: data[1]
              },
              width: '50vh'
            })
            .afterClosed()
        ),
        filter(Boolean),
        switchMap((task: Task) => this.scheduleService.createTask(task))
      )
      .subscribe();
  }

  removeTask(task: Task) {
    this.matBottomSheet
      .open(DeleteTaskComponent, { data: { task } })
      .afterDismissed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.scheduleService.deleteTask(task))
      )
      .subscribe();
  }
}
