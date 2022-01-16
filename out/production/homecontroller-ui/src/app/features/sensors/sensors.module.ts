import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { EditSensorComponent } from './components/edit-sensor/edit-sensor.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { SensorsListComponent } from './components/sensors-list/sensors-list.component';
import { SensorsRoutingModule } from './sensors-routing.module';
import { SensorsSiteComponent } from './sites/sensors-site/sensors-site.component';
import { SharedDirectivesModule } from '../../shared/directives/shared-directives.module';

@NgModule({
  declarations: [
    SensorsSiteComponent,
    SensorsListComponent,
    SensorComponent,
    EditSensorComponent
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedPipesModule,
    SharedDirectivesModule
  ]
})
export class SensorsModule {}
