import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Switcher } from '../../model/response/switcher.model';
import { SwitchersModule } from '../../switchers.module';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: SwitchersModule
})
export class SwitcherService {
  private $switchers = new BehaviorSubject<Switcher[]>([]);

  constructor(private httpService: HttpService) {
    httpService
      .getSwitchers()
      .pipe(first())
      .subscribe(switchers => this.$switchers.next(switchers));
  }

  get switchers() {
    return this.$switchers.asObservable();
  }
}
