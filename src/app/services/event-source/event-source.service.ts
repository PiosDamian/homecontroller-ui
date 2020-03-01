import { Injectable, NgZone } from '@angular/core';
import { empty, Observable, Observer } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { CommunicationService } from '../communication/communication.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EventSourceService {

  private readonly id: string;
  private eventSource: EventSource;
  private readonly eventListenerMap = new Map<string, EventListeners>();
  private registerListeners = true;

  constructor(private http: HttpService, private ngZone: NgZone, private communication: CommunicationService) {
    this.id = uuid();
    this.eventSource = this.http.getStateObservable(this.id);
    this.eventSource.onerror = event => {
      ngZone.run(() => {
        this.communication.error('Wystąpił problem z utowrzeniem kanału komunikacyjnego<br>Aktualizacje w czasie rzeczywistym nie będą możliwe');
      });
      this.registerListeners = false;
      this.eventSource.onerror = null;
    };
    window.onbeforeunload = this.onClose.bind(this);
  }

  addListener(eventName: string, id: string): Observable<string> {
    if (this.registerListeners) {
      return Observable.create((observer: Observer<string>) => {
        const eventListeners: EventListeners = {
          eventName,
          listener: (event: Event) => {
            this.ngZone.run(() => {
              console.log(event);
              observer.next((event as MessageEvent).data);
            });
          },
          errorListener: (event: Event) => {
            this.ngZone.run(() => observer.error(event));
          }
        };
        this.eventSource.addEventListener(eventName, eventListeners.listener);
        this.eventSource.addEventListener('error', eventListeners.errorListener);
        this.eventListenerMap.set(id, eventListeners);
      });
    } else {
      return empty();
    }
  }

  removeListener(id: string) {
    const eventListeners = this.eventListenerMap.get(id);
    if (eventListeners) {
      this.unregisterListeners(eventListeners);
      this.eventListenerMap.delete(id);
    } else {
      throw new Error(`No such id ${id}`);
    }
  }

  private unregisterListeners(eventListeners: EventListeners) {
    this.eventSource.removeEventListener(eventListeners.eventName, eventListeners.listener);
    this.eventSource.removeEventListener('error', eventListeners.errorListener);
  }

  private onClose() {
    const entryIterator = this.eventListenerMap.entries();
    let eventListenersEntry = entryIterator.next();
    while (!eventListenersEntry.done) {
      this.unregisterListeners(eventListenersEntry.value[1]);
      this.eventListenerMap.delete(eventListenersEntry.value[0]);
      eventListenersEntry = entryIterator.next();
    }
    this.eventSource.close();
    return true;
  }
}

interface EventListeners {
  readonly eventName: string;
  readonly listener: EventListenerOrEventListenerObject;
  readonly errorListener: (event: Event) => any;
}
