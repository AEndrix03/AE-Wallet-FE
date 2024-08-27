import { Component, Inject, Input, TemplateRef } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../modules/material.module';

@Component({
  selector: 'app-dialog-wrapper',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-wrapper.component.html',
})
export class DialogWrapperComponent {
  @Input() title: string = '';
  @Input() buttonsTemplate: TemplateRef<any> | null = null;

  dialogRef: MatDialogRef<any> | null = null;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialogRef = this.dialog.open(DialogWrapperDialog, {
      data: { title: this.title, buttonsTemplate: this.buttonsTemplate },
    });
  }
}

@Component({
  selector: 'app-dialog-wrapper-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <ng-content></ng-content>
    </div>
    <div mat-dialog-actions>
      <ng-container *ngTemplateOutlet="data.buttonsTemplate"></ng-container>
    </div>
  `,
})
export class DialogWrapperDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
