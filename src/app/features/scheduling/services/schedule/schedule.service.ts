import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { SensorService } from '../../../sensors/services/sensor/sensor.service';
import { SwitcherService } from '../../../switchers/services/switcher/switcher.service';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../model/task';
import { map, skipWhile, tap } from 'rxjs/operators';

@Injectable()
export class ScheduleService {
  private readonly _tasks$ = new BehaviorSubject<Map<string, Readonly<Task>>>(
    null
  );

  constructor(
    private readonly httpService: HttpService,
    private readonly sensorsService: SensorService,
    private readonly switchersService: SwitcherService
  ) {}

  getSwitchers() {
    return this.switchersService.switchers;
  }

  getSensors() {
    return this.sensorsService.sensors;
  }

  getTasks(refresh?: boolean) {
    if (refresh || !this._tasks$.getValue()) {
      this.httpService
        .getList()
        .pipe(
          map((list) =>
            list.reduce(
              (acc, curr) => acc.set(curr.name, curr),
              new Map<string, Task>()
            )
          ),
          tap((tasksMap) => this._tasks$.next(tasksMap))
        )
        .subscribe();
    }
    return this._tasks$.pipe(
      skipWhile((val) => !val),
      map((tasksMap: Map<string, Readonly<Task>>) =>
        [...tasksMap.values()].sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }

  deleteTask(task: Task) {
    return this.httpService.remove(task).pipe(
      tap(() => {
        const value = this._tasks$.getValue();
        value.delete(task.name);
        this._tasks$.next(value);
      })
    );
  }

  createTask(task: Task) {
    return this.httpService
      .store(task)
      .pipe(
        tap(() =>
          this._tasks$.next(this._tasks$.getValue().set(task.name, task))
        )
      );
  }
}
