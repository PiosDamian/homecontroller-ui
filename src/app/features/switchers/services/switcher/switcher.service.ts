import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Switcher } from '../../model/response/switcher.model';
import { HttpService } from '../http/http.service';

@Injectable()
export class SwitcherService {
  private readonly switchersMap = new Map<string, Switcher>();

  private switchers$ = new BehaviorSubject<Switcher[]>([]);

  constructor(private httpService: HttpService) {
    httpService
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
}
