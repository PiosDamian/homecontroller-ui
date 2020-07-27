import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/core/material.module';
import { SwitchersSiteComponent } from './sites/switchers-site/switchers-site.component';
import { SwitchersRoutingModule } from './switchers-routing.module';

@NgModule({
  declarations: [SwitchersSiteComponent],
  imports: [SwitchersRoutingModule, MaterialModule]
})
export class SwitchersModule {}
