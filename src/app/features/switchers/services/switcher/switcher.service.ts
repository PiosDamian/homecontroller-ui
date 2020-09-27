import { Inject, Injectable, OnDestroy } from '@angular/core';
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { SWITCHERS_STATE_CHANGES } from '../../constants/injections-tokens';
import { StateUpdate } from '../../model/request/state-update.model';
import { Switcher } from '../../model/response/switcher.model';
import { HttpService } from '../http/http.service';

@Injectable()
export class SwitcherService implements OnDestroy {
  private readonly switchersMap = new Map<string, Switcher>();

  private switchers$ = new BehaviorSubject<Switcher[]>([]);

  constructor(private httpService: HttpService, @Inject(SWITCHERS_STATE_CHANGES) switchersStateChanges: Observable<StateUpdate>) {
    this.refresh();
    switchersStateChanges.pipe(untilDestroyed(this)).subscribe(newState => this.updateState(newState));
  }

  refresh() {
    this.httpService
      .getSwitchers()
      .pipe(
        first(),
        tap(switchers => switchers.forEach(switcher => this.switchersMap.set(switcher.address, switcher)))
      )
      .subscribe(switchers => this.switchers$.next(switchers));
  }

  get switchers() {
    return this.switchers$.asObservable();
  }

  blink(switcher: Switcher) {
    this.httpService.switch(switcher.address).subscribe();
  }

  createSwitcher(newSwitcher: Switcher) {
    return this.httpService.createSwitcher(newSwitcher).pipe(
      tap(() => this.switchersMap.set(newSwitcher.address, newSwitcher)),
      tap(() => this.switchers$.next([...this.switchers$.getValue(), newSwitcher]))
    );
  }

  updateSwitcher(updateSwitcher: Switcher) {
    return this.httpService.updateSwitcher(updateSwitcher).pipe(
      tap(() => this.switchersMap.set(updateSwitcher.address, updateSwitcher)),
      tap(() => this.switchers$.next([...this.switchersMap.values()]))
    );
  }

  deleteSwitcher(switcher: Switcher) {
    return this.httpService.deleteSwitcher(switcher).pipe(
      tap(() => this.switchersMap.delete(switcher.address)),
      tap(() => this.switchers$.next([...this.switchersMap.values()]))
    );
  }

  private updateState(newState: StateUpdate) {
    if (this.switchersMap.has(newState.address)) {
      this.switchersMap.get(newState.address).state = newState.state;
    }
  }

  ngOnDestroy(): void {}
}
