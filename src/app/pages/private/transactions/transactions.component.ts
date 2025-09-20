import { Component } from '@angular/core';
import { TransactionsFiltersComponent } from './transactions-filters/transactions-filters.component';
import { TransactionsResultsComponent } from './transactions-results/transactions-results.component';

@Component({
  selector: 'wlt-transactions',
  imports: [TransactionsFiltersComponent, TransactionsResultsComponent],
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {}
