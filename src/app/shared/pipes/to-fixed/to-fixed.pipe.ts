import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {
  transform(value: any, precision: number = 3): unknown {
    if (isNaN(value)) {
      return value;
    } else {
      return value.toFixed(precision);
    }
  }
}
