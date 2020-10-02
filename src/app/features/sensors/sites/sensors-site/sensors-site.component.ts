import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CAN_EDIT_SENSORS } from '../../constants/injections-tokens';
import { SensorService } from '../../services/sensor/sensor.service';

@Component({
  selector: 'app-sensors-site',
  templateUrl: './sensors-site.component.html',
  styleUrls: ['./sensors-site.component.scss']
})
export class SensorsSiteComponent implements OnInit {
  constructor(public sensorsService: SensorService, @Inject(CAN_EDIT_SENSORS) @Optional() public canEdit: boolean = false) {}

  ngOnInit(): void {}
}
