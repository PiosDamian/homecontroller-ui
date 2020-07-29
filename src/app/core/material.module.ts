import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const materialModules = [MatDialogModule, MatProgressBarModule, MatSnackBarModule, MatIconModule];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}
