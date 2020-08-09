import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Switcher } from '../../model/response/switcher.model';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss', '../host-styles.scss']
})
export class SwitcherComponent {
  @Input()
  switcher: Switcher;

  @Output()
  stateChanged = new EventEmitter<Switcher>();
}
