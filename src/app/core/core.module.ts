import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from './material.module';
import { CommunicationService } from './services/communication/communication.service';
import { communicationInterceptorProvider } from './services/interceptors/communication.interceptor.service';

@NgModule({
  providers: [communicationInterceptorProvider, CommunicationService],
  declarations: [LoadingComponent, AlertComponent],
  imports: [MaterialModule, CommonModule]
})
export class CoreModule {}
