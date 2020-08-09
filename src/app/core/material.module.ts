import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = [MatDialogModule, MatProgressBarModule, MatSnackBarModule, MatIconModule, MatToolbarModule, MatButtonModule];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}
