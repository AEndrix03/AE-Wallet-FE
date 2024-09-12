import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogState,
} from '../components/dialogs/confirm-dialog/confirm-dialog.component';
import { filter, Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  openComponent$<T>(
    component: ComponentType<T>,
    config?: MatDialogConfig
  ): MatDialogRef<T> {
    const conf = config || {};
    return this.dialog.open(component, {
      minWidth: '40vw',
      minHeight: '30vh',
      disableClose: true,
      ...conf,
    });
  }
  openConfirmDialog(data: {
    message?: string;
    title?: string;
    displayCancel?: boolean;
  }): Observable<any> {
    return this.openComponent$(ConfirmDialogComponent, { data })
      .afterClosed()
      .pipe(filter((result) => result === ConfirmDialogState.Confirm));
  }
}
