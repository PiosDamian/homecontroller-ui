import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/shared/material.module';
import { SwitchersListComponent } from './switchers-list.component';

describe('SwitchersListComponent', () => {
  let component: SwitchersListComponent;
  let fixture: ComponentFixture<SwitchersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchersListComponent],
      imports: [MaterialModule]
    }).compileComponents();
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
