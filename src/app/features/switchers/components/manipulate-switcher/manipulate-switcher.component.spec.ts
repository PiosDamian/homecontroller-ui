import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateSwitcherComponent } from './manipulate-switcher.component';

describe('ManipulateSwitcherComponent', () => {
  let component: ManipulateSwitcherComponent;
  let fixture: ComponentFixture<ManipulateSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManipulateSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulateSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
