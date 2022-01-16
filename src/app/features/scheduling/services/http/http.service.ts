import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../model/task';

@Injectable()
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  private static addPrefix(suffix: string): string {
    return `schedule/${suffix}`.replace('//', '/');
  }

  getList(): Observable<Array<Task>> {
    return this.http.get<Array<Readonly<Task>>>(HttpService.addPrefix('tasks'));
  }

  remove(task: Task): Observable<void> {
    return this.http.delete<void>(HttpService.addPrefix(`task/${task.name}`), {
      responseType: 'text' as any
    });
  }

  store(task: Task): Observable<void> {
    return this.http.post<void>(HttpService.addPrefix(`task`), task, {
      responseType: 'text' as any
    });
  }
}
