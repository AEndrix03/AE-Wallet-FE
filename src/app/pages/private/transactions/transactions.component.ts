import { Component, inject } from '@angular/core';
import { TransactionsFiltersComponent } from './transactions-filters/transactions-filters.component';
import { TransactionsResultsComponent } from './transactions-results/transactions-results.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TransactionsCreateComponent } from './transactions-create/transactions-create.component';

@Component({
  selector: 'wlt-transactions',
  imports: [TransactionsFiltersComponent, TransactionsResultsComponent],
  templateUrl: './transactions.component.html',
  providers: [DialogService, DynamicDialogRef],
})
export class TransactionsComponent {
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly dialogService = inject(DialogService);

  protected addNewTransaction() {
    this.ref = this.dialogService.open(TransactionsCreateComponent, {
      header: 'Add New Transaction',
      modal: true,
      closeOnEscape: true,
      closable: true,
      width: '50vw',
    });
  }
}
