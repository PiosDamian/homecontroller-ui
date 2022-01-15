import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ManipulateSwitcherComponent } from './components/manipulate-switcher/manipulate-switcher.component';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { SwitchersListComponent } from './components/switchers-list/switchers-list.component';
import { SwitchersSiteComponent } from './sites/switchers-site/switchers-site.component';
import { SwitchersRoutingModule } from './switchers-routing.module';
import { DeleteSwitcherComponent } from './components/delete-switcher/delete-switcher.component';

@NgModule({
  declarations: [
    SwitchersSiteComponent,
    SwitchersListComponent,
    SwitcherComponent,
    ManipulateSwitcherComponent,
    DeleteSwitcherComponent
  ],
  imports: [
    SwitchersRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    SharedDirectivesModule
  ]
})
export class SwitchersModule {}
