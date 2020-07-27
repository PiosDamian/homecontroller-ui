import { NgModule } from '@angular/core';
import { communicationInterceptorProvider } from './interceptors/communication.interceptor.service';

@NgModule({
  providers: [communicationInterceptorProvider]
})
export class CoreModule {}
