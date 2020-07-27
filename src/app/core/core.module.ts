import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from './material.module';
import { CommunicationService } from './services/communication/communication.service';
import { communicationInterceptorProvider } from './services/interceptors/communication.interceptor.service';

@NgModule({
  providers: [communicationInterceptorProvider, CommunicationService],
  declarations: [LoadingComponent],
  imports: [MaterialModule]
})
export class CoreModule {}
