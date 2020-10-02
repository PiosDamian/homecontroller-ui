import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MaterialModule } from 'src/app/shared/material.module';
import { DeleteSwitcherComponent } from './delete-switcher.component';

describe('DeleteSwitcherComponent', () => {
  let component: DeleteSwitcherComponent;
  let fixture: ComponentFixture<DeleteSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSwitcherComponent],
      imports: [MaterialModule],
      providers: [
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: {}
        },
        {
          provide: MatBottomSheetRef,
          useValue: {
            dismiss: () => {}
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
