import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { ManipulateSwitcherComponent } from './components/manipulate-switcher/manipulate-switcher.component';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { SwitchersListComponent } from './components/switchers-list/switchers-list.component';
import { HttpService } from './services/http/http.service';
import { SwitcherService } from './services/switcher/switcher.service';
import { SwitchersSiteComponent } from './sites/switchers-site/switchers-site.component';
import { SwitchersRoutingModule } from './switchers-routing.module';

@NgModule({
  declarations: [SwitchersSiteComponent, SwitchersListComponent, SwitcherComponent, ManipulateSwitcherComponent],
  imports: [SwitchersRoutingModule, MaterialModule, CommonModule, ReactiveFormsModule],
  providers: [HttpService, SwitcherService]
})
export class SwitchersModule {}
