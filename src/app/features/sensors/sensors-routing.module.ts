import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SensorsSiteComponent } from './sites/sensors-site/sensors-site.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: SensorsSiteComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule]
})
export class SensorsRoutingModule {}
