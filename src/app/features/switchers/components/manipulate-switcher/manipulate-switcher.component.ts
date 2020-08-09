import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Switcher } from '../../model/response/switcher.model';

@Component({
  selector: 'app-manipulate-switcher',
  templateUrl: './manipulate-switcher.component.html',
  styleUrls: ['./manipulate-switcher.component.css']
})
export class ManipulateSwitcherComponent implements OnInit {
  form: FormGroup;

  private readonly baseSwitcher: Switcher;

  constructor(
    private dialogRef: MatDialogRef<ManipulateSwitcherComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) @Optional() data?: Switcher
  ) {
    if (data) {
      this.baseSwitcher = data;
    } else {
      this.baseSwitcher = {} as any;
    }
  }

  ngOnInit(): void {
    this.fb.group({
      name: new FormControl(this.baseSwitcher.name || '', [Validators.required]),
      address: new FormControl(this.baseSwitcher.address || '', [Validators.required]),
      listenerAddress: new FormControl(this.baseSwitcher.listenerAddress),
      force: new FormControl(null)
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
}
