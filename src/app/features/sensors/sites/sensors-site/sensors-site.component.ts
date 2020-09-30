import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CAN_EDIT_SENSORS } from '../../constants/injections-tokens';
import { SensorService } from '../../services/sensor/sensor.service';

@Component({
  selector: 'app-sensors-site',
  templateUrl: './sensors-site.component.html',
  styleUrls: ['./sensors-site.component.scss']
})
export class SensorsSiteComponent implements OnInit, OnDestroy {
  constructor(public sensorsService: SensorService, @Inject(CAN_EDIT_SENSORS) public canEdit: boolean) {}

  ngOnInit(): void {
    this.sensorsService.refresh();
  }

  ngOnDestroy(): void {
    this.sensorsService.pauseRefresh();
  }
}
