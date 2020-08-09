import { InjectionToken, NgModule, ValueProvider } from '@angular/core';

export const USE_EVENT_SOURCE = new InjectionToken<boolean>('useEventSource');

@NgModule({
  providers: [
    {
      provide: USE_EVENT_SOURCE,
      useValue: true,
      multi: false
    } as ValueProvider
  ]
})
export class CoreInjectionTokensModule {}
