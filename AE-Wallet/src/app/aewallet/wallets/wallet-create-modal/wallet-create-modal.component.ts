import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WalletCreateDto } from '../../store/models/wallet.model';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-wallet-create-modal',
  standalone: true,
  imports: [MaterialModule, ColorPickerModule],
  templateUrl: './wallet-create-modal.component.html',
  styleUrl: './wallet-create-modal.component.scss',
})
export class WalletCreateModalComponent {
  fg: FormGroup<WalletCreateForm> | null = null;

  selectedColor: string = '#ffffff';
  selectedBackgroundColor: string = 'red';

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<WalletCreateModalComponent>
  ) {
    this.fg = this._fb.group({
      name: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      description: new FormControl<string>(''),
    });
  }

  get nameFc(): FormControl<string> {
    return this.fg?.get('name') as FormControl<string>;
  }

  get descriptionFc(): FormControl<string> {
    return this.fg?.get('description') as FormControl<string>;
  }

  buildCreateDto(): WalletCreateDto {
    return {
      name: this.nameFc.value,
      description: this.descriptionFc.value,
      headerColor: this.selectedColor,
      headerBackgroundColor: this.selectedBackgroundColor,
    };
  }

  close(exit?: boolean): void {
    this._dialogRef.close(exit ? null : this.buildCreateDto());
  }
}

export interface WalletCreateForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
}
