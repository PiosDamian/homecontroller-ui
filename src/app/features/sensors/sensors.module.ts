import { NgModule } from '@angular/core';
import { HttpService } from './services/http/http.service';
import { SensorService } from './services/sensor/sensor.service';

@NgModule({
  providers: [HttpService, SensorService]
})
export class SensorsModule {}
