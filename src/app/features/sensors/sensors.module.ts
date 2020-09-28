import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SensorsRoutingModule } from './sensors-routing.module';
import { HttpService } from './services/http/http.service';
import { SensorService } from './services/sensor/sensor.service';
import { SensorsSiteComponent } from './sites/sensors-site/sensors-site.component';
import { SensorsListComponent } from './components/sensors-list/sensors-list.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { EditSensorComponent } from './components/edit-sensor/edit-sensor.component';

@NgModule({
  providers: [HttpService, SensorService],
  declarations: [SensorsSiteComponent, SensorsListComponent, SensorComponent, EditSensorComponent],
  imports: [CommonModule, SensorsRoutingModule, MaterialModule]
})
export class SensorsModule {}
