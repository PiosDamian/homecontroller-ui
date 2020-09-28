import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseSensor } from '../../model/base-sensor';
import { Sensor } from '../../model/response/sensor.model';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent {
  @Input()
  sensor: Sensor;

  @Input()
  canEdit: boolean;

  @Output()
  edit = new EventEmitter<BaseSensor>();
}
