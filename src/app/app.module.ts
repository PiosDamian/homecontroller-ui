import { HttpClientModule } from '@angular/common/http';
import { ClassProvider, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { communicationInterceptor } from './services/http/interceptors/communication.interceptor.service';

const interceptors: ClassProvider[] = [
  communicationInterceptor
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    ...interceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
