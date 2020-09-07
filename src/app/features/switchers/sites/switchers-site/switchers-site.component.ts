import { Component } from '@angular/core';
import { Switcher } from '../../model/response/switcher.model';
import { SwitcherService } from '../../services/switcher/switcher.service';

@Component({
  selector: 'app-switchers-site',
  templateUrl: './switchers-site.component.html',
  styleUrls: ['./switchers-site.component.scss', '../../components/host-styles.scss']
})
export class SwitchersSiteComponent {
  constructor(public switchersService: SwitcherService) {}

  onNewSwitcher({ switcher, isNew }) {
    if (isNew) {
      this.switchersService.createSwitcher(switcher).subscribe();
    } else {
      this.switchersService.updateSwitcher(switcher).subscribe();
    }
  }

  onTouch(switcher: Switcher) {
    this.switchersService.blink(switcher);
  }

  deleteSwitcher(switcher: Switcher) {
    this.switchersService.deleteSwitcher(switcher).subscribe();
  }
}
