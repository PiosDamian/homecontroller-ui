import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { CAN_EDIT_SENSORS } from '../../constants/injections-tokens';
import { SensorService } from '../../services/sensor/sensor.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-sensors-site',
  templateUrl: './sensors-site.component.html',
  styleUrls: ['./sensors-site.component.scss']
})
export class SensorsSiteComponent implements OnInit, OnDestroy {
  constructor(
    readonly sensorsService: SensorService,
    @Inject(CAN_EDIT_SENSORS)
    @Optional()
    readonly canEdit$: Observable<boolean> = of(false)
  ) {}

  ngOnInit(): void {
    this.sensorsService.refresh();
  }

  ngOnDestroy(): void {
    this.sensorsService.pauseRefresh();
  }
}
