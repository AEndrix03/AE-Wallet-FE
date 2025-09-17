import { Component } from '@angular/core';
import { TransactionsFiltersComponent } from './transactions-filters/transactions-filters.component';

@Component({
  selector: 'wlt-transactions',
  imports: [TransactionsFiltersComponent],
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {}
