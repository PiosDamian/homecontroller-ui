import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodWithStartControlComponent } from './period-with-start-control.component';

describe('PeriodWithStartControlComponent', () => {
  let component: PeriodWithStartControlComponent;
  let fixture: ComponentFixture<PeriodWithStartControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodWithStartControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodWithStartControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
