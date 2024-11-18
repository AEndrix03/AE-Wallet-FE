import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MaterialModule, NgIf],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  title: string | null = null;
  message: string = 'Are you sure to proceed?';
  displayCancel: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
    this.displayCancel = data.displayCancel;
  }

  close(state: ConfirmDialogState): void {
    this.dialogRef.close(state);
  }

  cancel = (): void => this.close(ConfirmDialogState.Cancel);
  confirm = (): void => this.close(ConfirmDialogState.Confirm);
}

export enum ConfirmDialogState {
  Confirm,
  Cancel,
}
