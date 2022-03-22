import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { calculatePeriod, units } from '../../model/task';
import { FormControlBoilerplate } from '../../../../shared/utils/FormControl';

@Component({
  selector: 'app-period-control',
  templateUrl: './period-control.component.html',
  styleUrls: ['./period-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PeriodControlComponent)
    }
  ]
})
export class PeriodControlComponent
  extends FormControlBoilerplate
  implements OnInit, ControlValueAccessor, OnDestroy
{
  private readonly _till$ = new Subject<void>();

  constructor(fb: FormBuilder) {
    super(fb);
  }

  isValid() {
    return this.form.valid;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: new FormControl(1, {
        validators: [Validators.required, Validators.min(1)]
      }),
      unit: new FormControl('days', {
        validators: [Validators.required, Validators.min(0)]
      })
    });

    combineLatest([
      this.form.get('amount').valueChanges,
      this.form.get('unit').valueChanges
    ])
      .pipe(
        takeUntil(this._till$),
        tap(() => this.onChange(this.getValue()))
      )
      .subscribe();
  }

  getValue() {
    return this.form.get('amount').value * units[this.form.get('unit').value];
  }

  getUnits(): string[] {
    return Object.keys(units);
  }

  registerOnChange(fn: any): void {
    super.registerOnChange(fn);
    this.onChange(this.getValue());
  }

  writeValue(obj: number): void {
    const period = calculatePeriod(obj);

    this.form.get('amount').patchValue(period.amount);
    this.form.get('unit').patchValue(period.unit);
  }

  ngOnDestroy(): void {
    this._till$.next();
    this._till$.complete();
  }
}
