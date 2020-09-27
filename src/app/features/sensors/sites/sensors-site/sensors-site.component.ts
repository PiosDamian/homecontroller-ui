import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../services/sensor/sensor.service';

@Component({
  selector: 'app-sensors-site',
  templateUrl: './sensors-site.component.html',
  styleUrls: ['./sensors-site.component.scss']
})
export class SensorsSiteComponent implements OnInit {
  constructor(public sensorsService: SensorService) {}

  ngOnInit(): void {}
}
