import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwitchersSiteComponent } from './sites/switchers-site/switchers-site.component';

const routes: Routes = [
  {
    path: '',
    component: SwitchersSiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SwitchersRoutingModule {}
