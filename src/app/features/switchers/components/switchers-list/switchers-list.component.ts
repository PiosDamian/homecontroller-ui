import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Switcher } from '../../model/response/switcher.model';
import { ManipulateSwitcherComponent } from '../manipulate-switcher/manipulate-switcher.component';

@Component({
  selector: 'app-switchers-list',
  templateUrl: './switchers-list.component.html',
  styleUrls: ['./switchers-list.component.scss', '../host-styles.scss']
})
export class SwitchersListComponent {
  @Input()
  switchers: Switcher[];

  @Output()
  stateChanged = new EventEmitter<Switcher>();

  constructor(private matDialog: MatDialog) {}

  createSwitcher() {
    this.matDialog.open(ManipulateSwitcherComponent).afterClosed().pipe(first()).subscribe();
  }
}
