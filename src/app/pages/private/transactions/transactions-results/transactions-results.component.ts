import { Component, input, InputSignal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TransactionDto } from '../../../../core/models/transaction.models';
import { Page, Pagination } from '../../../../core/models/core.models';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'wlt-transactions-results',
  imports: [CommonModule, DatePipe, TableModule, PaginatorModule],
  templateUrl: './transactions-results.component.html',
})
export class TransactionsResultsComponent {
  public readonly transactions: InputSignal<Page<TransactionDto>> =
    input.required();
  public readonly pagination: InputSignal<Pagination> = input.required();
}
