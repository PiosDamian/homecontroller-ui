import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './sites/schedule/schedule.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SchedulingRoutingModule } from './scheduling-routing.module';
import { HttpService } from './services/http/http.service';
import { ScheduleService } from './services/schedule/schedule.service';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskElementComponent } from './components/task-element/task-element.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PeriodControlComponent } from './components/period-control/period-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PeriodWithStartControlComponent } from './components/period-with-start-control/period-with-start-control.component';

@NgModule({
  declarations: [
    ScheduleComponent,
    CreateTaskComponent,
    DeleteTaskComponent,
    TasksListComponent,
    TaskElementComponent,
    PeriodControlComponent,
    PeriodWithStartControlComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    SchedulingRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [HttpService, ScheduleService]
})
export class SchedulingModule {}
