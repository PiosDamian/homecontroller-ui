import { Component, Inject, Optional } from '@angular/core';
import { CAN_EDIT_TASKS } from './features/scheduling/constants/injections-tokens';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    @Inject(CAN_EDIT_TASKS) @Optional() readonly canEditTasks$ = of(false)
  ) {}
}
