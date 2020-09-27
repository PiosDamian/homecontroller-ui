import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsSiteComponent } from './sensors-site.component';

describe('SensorsSiteComponent', () => {
  let component: SensorsSiteComponent;
  let fixture: ComponentFixture<SensorsSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorsSiteComponent ]
    })
    .compileComponents();
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
