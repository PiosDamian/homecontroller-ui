import { Inject, Injectable, OnDestroy } from '@angular/core';
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { SWITCHERS_STATE_CHANGES } from '../../constants/injections-tokens';
import { StateUpdate } from '../../model/request/state-update.model';
import { Switcher } from '../../model/response/switcher.model';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })
export class SwitcherService implements OnDestroy {
  private reservedPinsRead = false;
  private readonly switchersMap = new Map<number, Switcher>();

  private readonly switchers$ = new BehaviorSubject<Switcher[]>([]);

  private readonly _reservedPins = new Set<number>();

  constructor(
    private readonly httpService: HttpService,
    @Inject(SWITCHERS_STATE_CHANGES)
    switchersStateChanges: Observable<StateUpdate>
  ) {
    this.refresh();
    switchersStateChanges
      .pipe(untilDestroyed(this))
      .subscribe((newState) => this.updateState(newState));
    this.getReservedPins();
  }

  refresh() {
    this.httpService
      .getSwitchers()
      .pipe(
        first(),
        tap((switchers) =>
          switchers.forEach((switcher) =>
            this.switchersMap.set(switcher.address, switcher)
          )
        )
      )
      .subscribe((switchers) => this.switchers$.next(switchers));
  }

  get switchers() {
    return this.switchers$.asObservable();
  }

  get reservedPins(): number[] {
    return [...this._reservedPins];
  }

  blink(switcher: Switcher) {
    this.httpService.switch(switcher.address).subscribe();
  }

  createSwitcher(newSwitcher: Switcher) {
    return this.httpService.createSwitcher(newSwitcher).pipe(
      tap(() => this.switchersMap.set(newSwitcher.address, newSwitcher)),
      tap(() =>
        this.switchers$.next([...this.switchers$.getValue(), newSwitcher])
      ),
      tap(() => {
        this._reservedPins.add(newSwitcher.address);
        if (newSwitcher.listenerAddress) {
          this._reservedPins.add(newSwitcher.listenerAddress);
        }
      })
    );
  }

  updateSwitcher(updateSwitcher: Switcher) {
    return this.httpService.updateSwitcher(updateSwitcher).pipe(
      tap(() => {
        const currentSwitcher = this.switchersMap.get(updateSwitcher.address);
        if (
          currentSwitcher.listenerAddress &&
          currentSwitcher.listenerAddress !== updateSwitcher.listenerAddress
        ) {
          this._reservedPins.delete(currentSwitcher.listenerAddress);
          this._reservedPins.add(updateSwitcher.listenerAddress);
        }
      }),
      tap(() => this.switchersMap.set(updateSwitcher.address, updateSwitcher)),
      tap(() => this.switchers$.next([...this.switchersMap.values()]))
    );
  }

  deleteSwitcher(switcher: Switcher) {
    return this.httpService.deleteSwitcher(switcher).pipe(
      tap(() => {
        const currentSwitcher = this.switchersMap.get(switcher.address);
        this._reservedPins.delete(switcher.address);
        if (currentSwitcher.listenerAddress) {
          this._reservedPins.delete(currentSwitcher.listenerAddress);
        }
      }),
      tap(() => this.switchersMap.delete(switcher.address)),
      tap(() => this.switchers$.next([...this.switchersMap.values()]))
    );
  }

  private getReservedPins() {
    if (!this.reservedPinsRead) {
      this.reservedPinsRead = true;
      this.httpService
        .reservedPins()
        .pipe(
          tap((pins) => pins.forEach((pin) => this._reservedPins.add(pin))),
          catchError((error) => {
            this.reservedPinsRead = false;
            return throwError(error);
          })
        )
        .subscribe();
    }
  }

  private updateState(newState: StateUpdate) {
    if (this.switchersMap.has(newState.address)) {
      this.switchersMap.get(newState.address).state = newState.state;
    }
  }

  ngOnDestroy(): void {}
}
