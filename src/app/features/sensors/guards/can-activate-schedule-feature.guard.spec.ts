import { TestBed } from '@angular/core/testing';

import { CanActivateSchedulingFeatureGuard } from './can-activate-scheduling-feature-guard.service';

describe('CanActivateScheduleFeatureGuard', () => {
  let guard: CanActivateSchedulingFeatureGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateSchedulingFeatureGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
