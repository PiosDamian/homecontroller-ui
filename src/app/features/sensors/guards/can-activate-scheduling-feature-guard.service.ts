import { Inject, Injectable, Optional } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CAN_EDIT_TASKS } from '../../scheduling/constants/injections-tokens';

@Injectable({
  providedIn: 'root'
})
export class CanActivateSchedulingFeatureGuard implements CanLoad {
  constructor(
    @Inject(CAN_EDIT_TASKS) @Optional() private readonly canOpen$ = of(false)
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canOpen$;
  }
}
