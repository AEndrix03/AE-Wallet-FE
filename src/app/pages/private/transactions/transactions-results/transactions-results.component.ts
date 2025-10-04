import { Component, input, InputSignal, output } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TransactionDto } from '../../../../core/models/transaction.models';
import { Page, PaginationParams } from '../../../../core/models/core.models';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button'; // <-- Aggiungi

@Component({
  selector: 'wlt-transactions-results',
  imports: [CommonModule, DatePipe, TableModule, PaginatorModule, ButtonModule], // <-- Aggiungi
  templateUrl: './transactions-results.component.html',
})
export class TransactionsResultsComponent {
  public readonly transactions: InputSignal<Page<TransactionDto>> =
    input.required();
  public readonly pagination: InputSignal<PaginationParams> = input.required();

  public readonly onPaginationChange = output<PaginationParams>();
  public readonly onDelete = output<string>(); // <-- Nuovo output

  protected onPaginationChangeEvent(event: TableLazyLoadEvent) {
    const params: PaginationParams = {
      page: event.first! / event.rows!,
      size: event.rows ?? 10,
      sort: event.sortField as string,
      direction: event.sortOrder === 1 ? 'asc' : 'desc',
    };

    this.onPaginationChange.emit(params);
  }

  protected deleteTransaction(id: string) {
    // <-- Nuovo metodo
    this.onDelete.emit(id);
  }
}
