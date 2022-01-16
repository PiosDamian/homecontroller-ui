import { TestBed } from '@angular/core/testing';
import { USE_EVENT_SOURCE } from '../../core-injection-tokens.module';
import { CommunicationService } from '../communication/communication.service';
import { HttpService } from '../http/http.service';
import { EventSourceService } from './event-source.service';

// TODO: fix it
// FIXME
xdescribe('EventSourceService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        EventSourceService,
        {
          provide: HttpService,
          useValue: {}
        },
        {
          provide: CommunicationService,
          useValue: {}
        },
        {
          provide: USE_EVENT_SOURCE,
          useValue: true
        }
      ]
    })
  );

  it('should be created', () => {
    const service: EventSourceService = TestBed.inject(EventSourceService);
    expect(service).toBeTruthy();
  });
});
