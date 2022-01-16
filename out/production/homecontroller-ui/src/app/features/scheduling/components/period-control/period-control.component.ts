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

  units: { [key: string]: number } = {
    milliseconds: 1,
    seconds: 1000
  };

  onTouch = () => {};
  private onChange = (period) => {};

  constructor(private readonly fb: FormBuilder) {
    this.units.minutes = this.units.seconds * 60;
    this.units.hours = this.units.minutes * 60;
    this.units.days = this.units.hours * 24;
  }

  isValid() {
    return this.form.valid;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: new FormControl(1, { validators: [Validators.required] }),
      unit: new FormControl('days')
    });

    combineLatest([
      this.form.get('amount').valueChanges,
      this.form.get('unit').valueChanges
    ]).pipe(
      takeUntil(this._till$),
      tap(() => this.onChange(this.getValue()))
    );
  }

  getValue() {
    return (
      this.form.get('amount').value * this.units[this.form.get('unit').value]
    );
  }

  getUnits(): string[] {
    return Object.keys(this.units);
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
    if (obj % this.units.days === 0) {
      this.form.get('amount').patchValue(obj / this.units.days);
      this.form.get('unit').patchValue('days');
    } else if (obj % this.units.hours === 0) {
      this.form.get('amount').patchValue(obj / this.units.hours);
      this.form.get('unit').patchValue('hours');
    } else if (obj % this.units.minutes === 0) {
      this.form.get('amount').patchValue(obj / this.units.minutes);
      this.form.get('unit').patchValue('minutes');
    } else if (obj % this.units.seconds === 0) {
      this.form.get('amount').patchValue(obj / this.units.seconds);
      this.form.get('unit').patchValue('seconds');
    } else {
      this.form.get('amount').patchValue(obj / this.units.milliseconds);
      this.form.get('unit').patchValue('milliseconds');
    }
  }

  ngOnDestroy(): void {
    this._till$.next();
    this._till$.complete();
  }
}
