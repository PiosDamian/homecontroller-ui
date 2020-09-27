import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';
import { ManipulateSwitcherData, SwitcherData } from '../../model/manipulate-switcher-data.model';

@Component({
  selector: 'app-manipulate-switcher',
  templateUrl: './manipulate-switcher.component.html',
  styleUrls: ['./manipulate-switcher.component.scss']
})
export class ManipulateSwitcherComponent implements OnInit, OnDestroy {
  form: FormGroup;

  readonly baseSwitcher: SwitcherData;
  readonly title: string;

  constructor(
    private dialogRef: MatDialogRef<ManipulateSwitcherComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data?: ManipulateSwitcherData
  ) {
    if (data.pin) {
      this.baseSwitcher = data.pin;
    } else {
      this.baseSwitcher = {} as any;
    }

    this.title = data.title || '';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl(this.baseSwitcher.name, [Validators.required]),
      address: new FormControl(this.baseSwitcher.address, [Validators.required]),
      listenerAddress: new FormControl(this.baseSwitcher.listenerAddress),
      force: new FormControl(false)
    });

    this.form
      .get('force')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => {
        this.form.get('address').setValue(null);
        this.form.get('listenerAddress').setValue(null);
      });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

  get pinList() {
    return this.form.get('force').value
      ? this.baseSwitcher.allPins
      : this.baseSwitcher.availablePins
      ? this.baseSwitcher.availablePins
      : this.baseSwitcher.allPins;
  }

  ngOnDestroy() {
    // required
  }
}
