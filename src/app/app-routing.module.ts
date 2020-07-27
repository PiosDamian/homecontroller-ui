import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'switchers'
  },
  {
    path: 'switchers',
    loadChildren: () => import('./features/switchers/switchers.module').then(m => m.SwitchersModule)
  },
  {
    path: '**',
    redirectTo: 'switchers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
