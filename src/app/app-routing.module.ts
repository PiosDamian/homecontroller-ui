import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateSchedulingFeatureGuard } from './features/sensors/guards/can-activate-scheduling-feature-guard.service';

const routes: Routes = [
  {
    path: 'switchers',
    loadChildren: () =>
      import('./features/switchers/switchers.module').then(
        (m) => m.SwitchersModule
      )
  },
  {
    path: 'sensors',
    loadChildren: () =>
      import('./features/sensors/sensors.module').then((m) => m.SensorsModule)
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./features/scheduling/scheduling.module').then(
        (m) => m.SchedulingModule
      ),
    canLoad: [CanActivateSchedulingFeatureGuard]
  },
  {
    path: '',
    redirectTo: 'switchers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false })
  ],
  exports: [RouterModule],
  providers: [CanActivateSchedulingFeatureGuard]
})
export class AppRoutingModule {}
