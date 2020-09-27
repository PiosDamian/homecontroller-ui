import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopPropagation]'
})
export class StopPropagationDirective {
  @HostListener('click', ['$event'])
  stopPropagation($event: MouseEvent) {
    $event.stopPropagation();
  }
}
