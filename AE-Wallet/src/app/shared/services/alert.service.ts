import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogState,
} from '../components/dialogs/confirm-dialog/confirm-dialog.component';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  openDialog<T>(component: T, data?: any, config?: any): MatDialogRef<any> {
    return this.dialog.open(component as any, {
      width: '450px',
      data: data,
      ...config,
    });
  }

  openConfirmDialog(data: {
    message?: string;
    title?: string;
    displayCancel?: boolean;
  }): Observable<any> {
    return this.openDialog(ConfirmDialogComponent, data, { width: '350px' })
      .afterClosed()
      .pipe(filter((result) => result === ConfirmDialogState.Confirm));
  }
}
