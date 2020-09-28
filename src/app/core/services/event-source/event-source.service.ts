import { Inject, Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommunicationService } from 'src/app/core/services/communication/communication.service';
import { v4 as uuid } from 'uuid';
import { USE_EVENT_SOURCE } from '../../core-injection-tokens.module';
import { HttpService } from '../http/http.service';

@Injectable()
export class EventSourceService {
  private id: string;
  private eventSource: EventSource;
  private events$ = new Subject<PushMessage>();
  private unsubscribeSource = true;

  constructor(
    private http: HttpService,
    private ngZone: NgZone,
    private communication: CommunicationService,
    @Inject(USE_EVENT_SOURCE) private useEventSource: boolean
  ) {
    window.onbeforeunload = this.onClose.bind(this);
  }

  openChannel(): Promise<void> {
    return new Promise(res => {
      if (this.useEventSource) {
        this.id = uuid();
        this.eventSource = this.http.getEventsObservable(this.id);
        this.eventSource.onerror = (error: ErrorEvent) => {
          this.ngZone.run(() => {
            this.communication.error(`Problem z kanałem notyfikacji`, 8000);
            this.events$.error(error);
            this.unsubscribeSource = false;
          });
        };
        this.eventSource.onmessage = (event: MessageEvent) => {
          this.ngZone.run(() => this.events$.next(JSON.parse(event.data)));
        };
      }
      res();
    });
  }

  getMessageForTypes(...types: string[]) {
    return this.messages.pipe(filter(message => types.includes(message.type)));
  }

  get messages() {
    return this.events$.asObservable();
  }

  private onClose(event: BeforeUnloadEvent) {
    if (this.unsubscribeSource) {
      this.http.unregisterEventsObservable(this.id);
    }
  }
}

interface PushMessage {
  type: string;
  payload: { [key: string]: any };
}
