import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';
import { sortBy } from 'lodash';
import { filter } from 'rxjs/operators';
import { removeElementsOfArray } from 'src/app/shared/utils/array-utils/array.utils';
import {
  ManipulateSwitcherData,
  SwitcherData
} from '../../model/manipulate-switcher-data.model';

@Component({
  selector: 'app-manipulate-switcher',
  templateUrl: './manipulate-switcher.component.html',
  styleUrls: ['./manipulate-switcher.component.scss']
})
export class ManipulateSwitcherComponent implements OnInit, OnDestroy {
  form: FormGroup;

  readonly baseSwitcher: SwitcherData;
  readonly title: string;

  private allAvailablePins: number[];

  private _availableSwitcherPins: number[];
  private _availableListenerPins: number[];

  set availableSwitcherPins(pins: number[]) {
    this._availableSwitcherPins = pins;
  }

  get availableSwitcherPins() {
    return sortBy(this._availableSwitcherPins);
  }

  set availableListenerPins(pins: number[]) {
    this._availableListenerPins = pins;
  }

  get availableListenerPins() {
    return sortBy(this._availableListenerPins);
  }

  constructor(
    private readonly dialogRef: MatDialogRef<ManipulateSwitcherComponent>,
    private readonly fb: FormBuilder,
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
    this.setPins();

    this.createForm();

    this.listenForce();

    this.listenAddress();

    this.listenListenerAddress();
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

  private setPins() {
    const pins = removeElementsOfArray(
      this.baseSwitcher.allPins,
      this.baseSwitcher.reservedPins || []
    );
    this.availableListenerPins = [...pins];
    this.availableSwitcherPins = [...pins];
    this.allAvailablePins = [...pins];

    if (this.baseSwitcher.address) {
      this.availableSwitcherPins.push(this.baseSwitcher.address);
    }

    if (this.baseSwitcher.listenerAddress) {
      this.availableListenerPins.push(this.baseSwitcher.listenerAddress);
    }
  }

  private createForm() {
    this.form = this.fb.group({
      name: new FormControl(this.baseSwitcher.name, [Validators.required]),
      address: new FormControl(this.baseSwitcher.address, [
        Validators.required
      ]),
      listenerAddress: new FormControl(this.baseSwitcher.listenerAddress),
      force: new FormControl(false)
    });
  }

  private listenForce() {
    this.form
      .get('force')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: true) => {
        this.form.get('address').setValue(null);
        this.form.get('listenerAddress').setValue(null);

        if (value) {
          this.availableListenerPins = [...this.baseSwitcher.allPins];
          this.availableSwitcherPins = [...this.baseSwitcher.allPins];
        } else {
          this.setPins();
        }
      });
  }

  private listenAddress() {
    this.form
      .get('address')
      .valueChanges.pipe(
        untilDestroyed(this),
        filter((val) => val != null)
      )
      .subscribe(
        (value: number) =>
          (this.availableListenerPins = removeElementsOfArray(
            this.allAvailablePins,
            [value]
          ))
      );
  }

  private listenListenerAddress() {
    this.form
      .get('listenerAddress')
      .valueChanges.pipe(
        untilDestroyed(this),
        filter((val) => val != null)
      )
      .subscribe((value: number) => {
        this.availableSwitcherPins = removeElementsOfArray(
          this.allAvailablePins,
          [value]
        );
      });
  }

  ngOnDestroy() {
    // required
  }
}
