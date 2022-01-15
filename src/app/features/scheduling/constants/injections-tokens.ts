import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const CAN_EDIT_TASKS = new InjectionToken<Observable<boolean>>(
  'canEditTasks'
);
