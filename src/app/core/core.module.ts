import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, FactoryProvider, NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CoreInjectionTokensModule } from './core-injection-tokens.module';
import { MaterialModule } from './material.module';
import { CommunicationService } from './services/communication/communication.service';
import { EventSourceService } from './services/event-source/event-source.service';
import { HttpService } from './services/http/http.service';
import { communicationInterceptorProvider } from './services/interceptors/communication-interceptor/communication.interceptor';
import { urlInterceptorProvider } from './services/interceptors/url-interceptor/url.interceptor';

@NgModule({
  providers: [
    communicationInterceptorProvider,
    urlInterceptorProvider,
    CommunicationService,
    HttpService,
    EventSourceService,
    {
      provide: APP_INITIALIZER,
      useFactory: (eventSourceService: EventSourceService) => () => {
        return environment.openEventChannel ? eventSourceService.openChannel() : new Promise(res => res());
      },
      deps: [EventSourceService],
      multi: true
    } as FactoryProvider
  ],
  declarations: [LoadingComponent, AlertComponent],
  imports: [MaterialModule, CommonModule, CoreInjectionTokensModule]
})
export class CoreModule {}
