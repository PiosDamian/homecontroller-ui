import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSwitcherComponent } from './delete-switcher.component';

describe('DeleteSwitcherComponent', () => {
  let component: DeleteSwitcherComponent;
  let fixture: ComponentFixture<DeleteSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSwitcherComponent ]
    })
    .compileComponents();
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
