import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { CommunicationService } from './core/services/communication/communication.service';
import { EventSourceService } from './core/services/event-source/event-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('alertState', [
      transition(':enter', [style({ opacity: 0 }), animate(500)]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate(
          500,
          style({
            opacity: 0,
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            top: '-100px',
            paddingTop: 0,
            paddingBottom: 0
          })
        )
      ])
    ])
  ]
})
export class AppComponent {
  constructor(eventSourceService: EventSourceService, public communication: CommunicationService) {}
}
