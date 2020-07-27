import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'switchers',
    loadChildren: () => import('./features/switchers/switchers.module').then(m => m.SwitchersModule)
  },
  {
    path: '',
    redirectTo: 'switchers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
