<<<<<<< HEAD
import {  MatDialogConfig } from '@angular/material/dialog';
=======
import { MatDialogConfig } from '@angular/material/dialog';
>>>>>>> origin/1-auth-finished


export function defaultDialogConfig() {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '400px';

  return dialogConfig;
}
