import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ControlType } from '../../model/control-type';
import { Type } from '../../model/type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Switcher } from '../../../switchers/model/response/switcher.model';
import { BaseSensor } from '../../../sensors/model/base-sensor';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private readonly _till$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly matDialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA)
    readonly data: { switchers: Switcher[]; sensors: BaseSensor[] }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', { validators: [Validators.required] }),
      expression: new FormControl(1, { validators: [Validators.required] }),
      controlType: new FormControl(ControlType.PERIOD),
      actionType: new FormControl(Type.SWITCH),
      data: new FormGroup({
        address: new FormControl(null, { validators: [Validators.required] })
      })
    });

    this.form
      .get('controlType')
      .valueChanges.pipe(takeUntil(this._till$))
      .subscribe((type: ControlType) => {
        const expressionField = this.form.get('expression');
        if (type === ControlType.PERIOD) {
          expressionField.setValue(1, { emitEvent: false });
        } else {
          expressionField.setValue('* * * * * *', { emitEvent: false });
        }
      });
  }

  submit() {
    this.matDialogRef.close(this.form.value);
  }

  hasDevices() {
    return !!this.devicesForTyp()?.length;
  }

  devicesForTyp() {
    return this.form.get('actionType').value === Type.SWITCH
      ? this.data.switchers
      : this.data.sensors;
  }

  ngOnDestroy(): void {
    this._till$.next();
    this._till$.complete();
  }
}
