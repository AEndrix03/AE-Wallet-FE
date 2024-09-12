import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WalletService } from '../../services/wallet.service';
import { tap } from 'rxjs';
import { EntryDto } from '../../store/models/wallet.model';

@Component({
  selector: 'app-entry-detail',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './entry-detail.component.html',
  styleUrl: './entry-detail.component.scss',
})
export class EntryDetailComponent {
  fg: FormGroup<EntryDetailForm>;

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<EntryDetailComponent>,
    private walletService: WalletService
  ) {
    if (this.data.entryId != null) {
      this.walletService
        .getWalletEntryById(this.data.entryId)
        .pipe(tap((entry) => this.initForm(entry)))
        .subscribe();
    } else {
      this.initForm(null);
    }

    this.fg.markAllAsTouched();
  }

  initForm(entry: EntryDto | null) {
    this.fg = this._fb.group({
      title: new FormControl(entry?.title || '', {
        validators: [Validators.required],
      }),
      description: new FormControl(entry?.description || ''),
      amount: new FormControl(entry?.value || 0, {
        validators: [Validators.required],
      }),
      date: new FormControl(entry?.date || new Date(), {
        validators: [Validators.required],
      }),
    });
  }

  save() {
    this._dialogRef.close(this.fg.value);
  }

  get titleFc(): FormControl<string> {
    return this.fg.get('title') as FormControl<string>;
  }

  get descriptionFc(): FormControl<string> {
    return this.fg.get('description') as FormControl<string>;
  }

  get amountFc(): FormControl<number> {
    return this.fg.get('amount') as FormControl<number>;
  }

  get dateFc(): FormControl<Date> {
    return this.fg.get('date') as FormControl<Date>;
  }
}

export interface EntryDetailForm {
  title: FormControl<string>;
  description: FormControl<string>;
  amount: FormControl<number>;
  date: FormControl<Date>;
}
