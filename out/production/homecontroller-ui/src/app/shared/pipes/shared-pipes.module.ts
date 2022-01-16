import { NgModule } from '@angular/core';
import { ToFixedPipe } from './to-fixed/to-fixed.pipe';

const pipes = [ToFixedPipe];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule {}
