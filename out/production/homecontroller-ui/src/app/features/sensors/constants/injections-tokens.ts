import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const CAN_EDIT_SENSORS = new InjectionToken<Observable<boolean>>('canEditSensors');
