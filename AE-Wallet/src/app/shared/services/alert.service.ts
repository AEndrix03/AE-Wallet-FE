import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  openDialog<T>(component: T, data?: any, config?: any): MatDialogRef<any> {
    return this.dialog.open(component as any, {
      width: '400px',
      data: data,
      ...config,
    });
  }
}
