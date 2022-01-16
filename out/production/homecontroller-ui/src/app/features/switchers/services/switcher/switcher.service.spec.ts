import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SWITCHERS_STATE_CHANGES } from '../../constants/injections-tokens';
import { SwitcherState } from '../../model/response/switcher-state.enum';
import { HttpService } from '../http/http.service';
import { SwitcherService } from './switcher.service';

describe('SwitcherService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        SwitcherService,
        {
          provide: HttpService,
          useValue: {
            getSwitchers: () => of([]).pipe(delay(1))
          }
        },
        {
          provide: SWITCHERS_STATE_CHANGES,
          useValue: new ReplaySubject<SwitcherState>(1)
        }
      ]
    })
  );

  it('should be created', () => {
    const service: SwitcherService = TestBed.inject(SwitcherService);
    expect(service).toBeTruthy();
  });
});
