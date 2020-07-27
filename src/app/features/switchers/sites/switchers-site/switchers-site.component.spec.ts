import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchersSiteComponent } from './switchers-site.component';

describe('SwitchersSiteComponent', () => {
  let component: SwitchersSiteComponent;
  let fixture: ComponentFixture<SwitchersSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchersSiteComponent ]
    })
    .compileComponents();
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
