import { Component } from '@angular/core';
import { SwitcherService } from '../../services/switcher/switcher.service';

@Component({
  selector: 'app-switchers-site',
  templateUrl: './switchers-site.component.html',
  styleUrls: ['./switchers-site.component.scss', '../../components/host-styles.scss']
})
export class SwitchersSiteComponent {
  constructor(public switchersService: SwitcherService) {}
}
