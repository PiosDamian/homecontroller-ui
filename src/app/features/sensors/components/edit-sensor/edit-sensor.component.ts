import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseSensor } from '../../model/base-sensor';

@Component({
  selector: 'app-edit-sensor',
  templateUrl: './edit-sensor.component.html',
  styleUrls: ['./edit-sensor.component.scss']
})
export class EditSensorComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BaseSensor,
    public dialogRef: MatDialogRef<EditSensorComponent, BaseSensor>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl(this.data.name),
      units: new FormControl(this.data.units),
      factor: new FormControl(this.data.factor),
      address: new FormControl(this.data.address),
      equationConst: new FormControl(this.data.equationConst)
    });
  }
}
