import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material.module';
import { SwitcherComponent } from '../../components/switcher/switcher.component';
import { SwitchersListComponent } from '../../components/switchers-list/switchers-list.component';
import { CAN_EDIT_SWITCHER } from '../../constants/injections-tokens';
import { SwitcherService } from '../../services/switcher/switcher.service';
import { SwitchersSiteComponent } from './switchers-site.component';

describe('SwitchersSiteComponent', () => {
  let component: SwitchersSiteComponent;
  let fixture: ComponentFixture<SwitchersSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchersSiteComponent, SwitchersListComponent, SwitcherComponent],
      providers: [
        {
          provide: SwitcherService,
          useValue: {}
        },
        {
          provide: CAN_EDIT_SWITCHER,
          useValue: of(true)
        }
      ],
      imports: [ReactiveFormsModule, MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchersSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
