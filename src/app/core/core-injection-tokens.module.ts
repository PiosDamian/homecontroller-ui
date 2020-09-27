import { InjectionToken, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CAN_EDIT_SENSORS } from '../features/sensors/constants/injections-tokens';
import { CAN_EDIT_SWITCHER, SWITCHERS_STATE_CHANGES } from '../features/switchers/constants/injections-tokens';
import { EventSourceService } from './services/event-source/event-source.service';

export const USE_EVENT_SOURCE = new InjectionToken<boolean>('useEventSource');

@NgModule({
  providers: [
    {
      provide: USE_EVENT_SOURCE,
      useValue: true,
      multi: false
    },
    {
      provide: CAN_EDIT_SENSORS,
      useValue: of(true),
      multi: false
    },
    {
      provide: CAN_EDIT_SWITCHER,
      useValue: of(true),
      multi: false
    },
    {
      provide: SWITCHERS_STATE_CHANGES,
      useFactory: (eventSource: EventSourceService) => eventSource.getMessageForTypes('stateUpdate').pipe(pluck('payload')),
      deps: [EventSourceService],
      multi: false
    }
  ]
})
export class CoreInjectionTokensModule {}
