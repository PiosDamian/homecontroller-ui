import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { SensorService } from './sensor.service';

describe('SensorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        SensorService,
        {
          provide: HttpService,
          useValue: {
            getSensors: () => of([]).pipe(delay(1))
          }
        }
      ]
    })
  );

  it('should be created', () => {
    const service: SensorService = TestBed.inject(SensorService);
    expect(service).toBeTruthy();
  });
});
