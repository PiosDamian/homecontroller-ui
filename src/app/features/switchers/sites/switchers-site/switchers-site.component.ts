import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';
import { Observable, of } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { DeleteSwitcherComponent } from '../../components/delete-switcher/delete-switcher.component';
import { CAN_EDIT_SWITCHER } from '../../constants/injections-tokens';
import { Switcher } from '../../model/response/switcher.model';
import { SwitcherService } from '../../services/switcher/switcher.service';

@Component({
  selector: 'app-switchers-site',
  templateUrl: './switchers-site.component.html',
  styleUrls: ['./switchers-site.component.scss', '../../components/host-styles.scss']
})
export class SwitchersSiteComponent implements OnDestroy {
  constructor(
    public switchersService: SwitcherService,
    private matBottomSheet: MatBottomSheet,
    @Inject(CAN_EDIT_SWITCHER) @Optional() public canEdit: Observable<boolean> = of(false)
  ) {}

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
    this.matBottomSheet
      .open(DeleteSwitcherComponent)
      .afterDismissed()
      .pipe(untilDestroyed(this), first(), filter(Boolean))
      .subscribe(() => this.switchersService.deleteSwitcher(switcher).subscribe());
  }

  ngOnDestroy() {}
}
