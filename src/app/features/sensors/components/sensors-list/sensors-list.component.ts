import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';
import { filter, first } from 'rxjs/operators';
import { BaseSensor } from '../../model/base-sensor';
import { Sensor } from '../../model/response/sensor.model';
import { EditSensorComponent } from '../edit-sensor/edit-sensor.component';

@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.scss']
})
export class SensorsListComponent implements OnDestroy {
  @Input()
  sensors: Sensor[];

  @Input()
  canEdit: boolean;

  @Output()
  updateSensor = new EventEmitter<BaseSensor>();

  constructor(private dialog: MatDialog) {}

  editSensor(sensor: BaseSensor) {
    this.dialog
      .open(EditSensorComponent, {
        data: sensor
      })
      .afterClosed()
      .pipe(
        first(),
        untilDestroyed(this),
        filter(val => Boolean(val))
      )
      .subscribe(newSensor => this.updateSensor.emit(newSensor));
  }

  ngOnDestroy() {}
}
