import { NgModule } from '@angular/core';
import { StopPropagationDirective } from './stop-propagation/stop-propagation.directive';

const directives = [StopPropagationDirective];

@NgModule({
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule {}
