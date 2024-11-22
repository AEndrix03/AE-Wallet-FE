import { Component, Inject } from '@angular/core';
import { DialogWrapperComponent } from '../../../../shared/components/utils/dialog-wrapper/dialog-wrapper.component';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntryFilterDto } from '../../../store/models/wallet.model';

@Component({
  selector: 'app-wallet-filter-modal',
  standalone: true,
  imports: [DialogWrapperComponent, MaterialModule],
  templateUrl: './wallet-filter-modal.component.html',
  styleUrl: './wallet-filter-modal.component.scss',
})
export class WalletFilterModalComponent {
  filters: EntryFilterDto = {};
  filtersStart: EntryFilterDto = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: EntryFilterDto,
    private _dialogRef: MatDialogRef<WalletFilterModalComponent>
  ) {
    this.filters = { ...data };
    this.filtersStart = { ...data };
  }

  filter() {
    this._dialogRef.close(this.filters);
  }

  reset() {
    this._dialogRef.close();
  }

  exit() {
    this._dialogRef.close(this.filtersStart);
  }
}
