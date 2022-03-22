import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { noop } from 'rxjs';

export abstract class FormControlBoilerplate implements ControlValueAccessor {
  form: FormGroup;

  onTouch = noop;

  protected constructor(protected readonly fb: FormBuilder) {}

  protected onChange = (_) => {};

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

  abstract writeValue(obj: any): void;
}
