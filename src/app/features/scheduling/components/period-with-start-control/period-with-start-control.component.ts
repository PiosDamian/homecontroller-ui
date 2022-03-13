import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { FormControlBoilerplate } from '../../../../shared/utils/FormControl';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-period-with-start-control',
  templateUrl: './period-with-start-control.component.html',
  styleUrls: ['./period-with-start-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PeriodWithStartControlComponent)
    }
  ]
})
export class PeriodWithStartControlComponent
  extends FormControlBoilerplate
  implements OnInit, ControlValueAccessor, OnDestroy
{
  private readonly _till$ = new Subject<void>();

  constructor(fb: FormBuilder) {
    super(fb);
  }

  private static writeIfDefined(field: AbstractControl, value: number) {
    if (value != null) {
      field.patchValue(value);
    }
  }

  ngOnInit(): void {
    const now = new Date();
    this.form = this.fb.group({
      start: this.fb.group({
        hour: new FormControl(now.getHours(), [
          Validators.min(0),
          Validators.max(23),
          Validators.required
        ]),
        minute: new FormControl(now.getMinutes(), [
          Validators.min(0),
          Validators.max(59),
          Validators.required
        ]),
        second: new FormControl(now.getSeconds(), [
          Validators.min(0),
          Validators.max(59),
          Validators.required
        ])
      }),
      period: new FormControl(1000 * 60, [
        Validators.required,
        Validators.min(0)
      ])
    });

    this.form.valueChanges
      .pipe(
        takeUntil(this._till$),
        tap(() => this.onChange(this.getValue()))
      )
      .subscribe();
  }

  writeValue(obj: any): void {
    try {
      const definition = JSON.parse(obj);
      PeriodWithStartControlComponent.writeIfDefined(
        this.form.get('hour'),
        definition.hour
      );
      PeriodWithStartControlComponent.writeIfDefined(
        this.form.get('minute'),
        definition.minute
      );
      PeriodWithStartControlComponent.writeIfDefined(
        this.form.get('second'),
        definition.second
      );
      this.form
        .get('period')
        .patchValue(definition.period != null ? definition.period : 1000 * 60);
    } catch (e) {
      // ignore
    }
  }

  getValue() {
    return JSON.stringify(this.form.value);
  }

  registerOnChange(fn: any) {
    super.registerOnChange(fn);
    this.onChange(this.getValue());
  }

  ngOnDestroy(): void {
    this._till$.next();
    this._till$.complete();
  }
}
