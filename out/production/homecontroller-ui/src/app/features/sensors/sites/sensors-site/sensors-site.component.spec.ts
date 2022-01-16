import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material.module';
import { SensorComponent } from '../../components/sensor/sensor.component';
import { SensorsListComponent } from '../../components/sensors-list/sensors-list.component';
import { CAN_EDIT_SENSORS } from '../../constants/injections-tokens';
import { SensorService } from '../../services/sensor/sensor.service';
import { SensorsSiteComponent } from './sensors-site.component';

describe('SensorsSiteComponent', () => {
  let component: SensorsSiteComponent;
  let fixture: ComponentFixture<SensorsSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SensorsSiteComponent, SensorsListComponent, SensorComponent],
      providers: [
        {
          provide: SensorService,
          useValue: {}
        },
        {
          provide: CAN_EDIT_SENSORS,
          useValue: of(true)
        }
      ],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
