import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchersListComponent } from './switchers-list.component';

describe('SwitchersListComponent', () => {
  let component: SwitchersListComponent;
  let fixture: ComponentFixture<SwitchersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
