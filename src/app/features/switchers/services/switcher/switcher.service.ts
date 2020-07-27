import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Switcher } from 'src/app/model/response/switcher.model';
import { HttpService } from '../http/http.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwitcherService {
  private $switchers = new BehaviorSubject<Switcher[]>([]);

  constructor(private httpService: HttpService) {
    httpService.getSwitchers()
      .pipe(
        first()
      )
      .subscribe(
        switchers => this.$switchers.next(switchers)
      );
  }

  get switchers() {
    return this.$switchers.asObservable();
  }
}
