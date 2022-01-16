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
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { calculatePeriod, units } from '../../model/task';

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
  implements OnInit, ControlValueAccessor, OnDestroy
{
  private readonly _till$ = new Subject<void>();
  form: FormGroup;

  onTouch = () => {};
  private onChange = (_) => {};

  constructor(private readonly fb: FormBuilder) {}

  isValid() {
    return this.form.valid;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: new FormControl(1, {
        validators: [Validators.required, Validators.min(1)]
      }),
      unit: new FormControl('days', { validators: [Validators.required] })
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
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
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
