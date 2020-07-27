import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const materialModules = [MatDialogModule, MatProgressBarModule];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}
