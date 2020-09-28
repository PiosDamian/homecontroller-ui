import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first } from 'rxjs/operators';
import { ManipulateSwitcherData } from '../../model/manipulate-switcher-data.model';
import { Switcher } from '../../model/response/switcher.model';
import { StateChange } from '../../model/state-changed.model';
import { ManipulateSwitcherComponent } from '../manipulate-switcher/manipulate-switcher.component';

@Component({
  selector: 'app-switchers-list',
  templateUrl: './switchers-list.component.html',
  styleUrls: ['./switchers-list.component.scss', '../host-styles.scss']
})
export class SwitchersListComponent {
  private static readonly allPins = (() => {
    const arr = Array.from(Array(32).keys());
    arr.splice(7, 1);
    return arr;
  })();

  @Input()
  switchers: Switcher[];

  @Input()
  canEdit = false;

  @Output()
  switcherUpdated = new EventEmitter<StateChange>();

  @Output()
  stateChanged = new EventEmitter<Switcher>();

  @Output()
  remove = new EventEmitter<Switcher>();

  constructor(private matDialog: MatDialog) {}

  createSwitcher() {
    this.matDialog
      .open(ManipulateSwitcherComponent, {
        data: {
          pin: {
            allPins: SwitchersListComponent.allPins
          },
          title: 'Create pin'
        } as ManipulateSwitcherData
      })
      .afterClosed()
      .pipe(
        first(),
        filter(val => !!val)
      )
      .subscribe((switcher: Switcher) => this.switcherUpdated.emit({ switcher, isNew: true }));
  }

  editSwitcher({ address, name, listenerAddress }) {
    this.matDialog
      .open(ManipulateSwitcherComponent, {
        data: {
          pin: {
            address,
            name,
            listenerAddress,
            allPins: SwitchersListComponent.allPins
          },
          title: 'Edit pin'
        } as ManipulateSwitcherData
      })
      .afterClosed()
      .pipe(
        first(),
        filter(val => !!val)
      )
      .subscribe((switcher: Switcher) => this.switcherUpdated.emit({ switcher, isNew: false }));
  }
}
