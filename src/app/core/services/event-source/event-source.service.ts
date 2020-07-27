import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommunicationService } from 'src/app/core/services/communication/communication.service';
import { v4 as uuid } from 'uuid';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EventSourceService {
  private readonly id: string;
  private eventSource: EventSource;
  private readonly $events: Observable<PushMessage>;

  constructor(private http: HttpService, ngZone: NgZone, communication: CommunicationService) {
    this.id = uuid();
    this.$events = new Observable((observer: Observer<PushMessage>) => {
      this.eventSource = this.http.getEventsObservable(this.id);
      this.eventSource.onerror = (event: Event) => {
        ngZone.run(() => {
          communication.error(`Problem z kanałem notyfikacji`);
          observer.error(new Error(`Unknown problem with push canal`));
        });
      };
      this.eventSource.onmessage = (event: MessageEvent) => ngZone.run(() => observer.next(JSON.parse(event.data)));
    });
    window.onbeforeunload = this.onClose.bind(this);
  }

  getMessageForTypes(...types: string[]) {
    return this.$events.pipe(filter(message => types.includes(message.type)));
  }

  private onClose(event: BeforeUnloadEvent) {
    event.stopPropagation();
    event.returnValue = undefined;
    this.eventSource.close();
    this.http.unregisterEventsObservable(this.id).subscribe({ error: () => {} });
    return true;
  }
}

interface PushMessage {
  type: string;
  payload: any;
}
