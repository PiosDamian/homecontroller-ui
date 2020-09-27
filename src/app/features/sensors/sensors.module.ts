import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SensorsRoutingModule } from './sensors-routing.module';
import { HttpService } from './services/http/http.service';
import { SensorService } from './services/sensor/sensor.service';
import { SensorsSiteComponent } from './sites/sensors-site/sensors-site.component';

@NgModule({
  providers: [HttpService, SensorService],
  declarations: [SensorsSiteComponent],
  imports: [CommonModule, SensorsRoutingModule]
})
export class SensorsModule {}
