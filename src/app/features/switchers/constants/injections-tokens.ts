import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { StateUpdate } from '../model/request/state-update.model';

export const CAN_EDIT_SWITCHER = new InjectionToken<Observable<boolean>>('canEditSwitchers');
export const SWITCHERS_STATE_CHANGES = new InjectionToken<Observable<StateUpdate>>('switchersStateChanges');
