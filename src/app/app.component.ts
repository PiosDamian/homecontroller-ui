import { Component } from '@angular/core';
import { CommunicationService } from './core/services/communication/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(communication: CommunicationService) {}
}
