import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AccordionComponent } from '../../../../../core/components/accordion/accordion.component';
import { PortfolioDto } from '../../../../../core/models/portfolio.models';
import { TransactionDto } from '../../../../../core/models/transaction.models';
import { DatePipe } from '@angular/common';
import { TransactionsResultsComponent } from '../../../transactions/transactions-results/transactions-results.component';
import { Page, PaginationParams } from '../../../../../core/models/core.models';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { TransactionsCreateComponent } from '../../../transactions/transactions-create/transactions-create.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'wlt-portfolio-detail',
  imports: [
    AccordionComponent,
    DatePipe,
    TransactionsResultsComponent,
    ButtonComponent,
  ],
  templateUrl: './portfolio-detail.component.html',
  providers: [DialogService, DynamicDialogRef],
})
export class PortfolioDetailComponent {
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly dialogService = inject(DialogService);

  public readonly portfolio: WritableSignal<PortfolioDto> = signal(null);
  public readonly transactions: WritableSignal<Page<TransactionDto>> =
    signal(null);
  public readonly pagination: WritableSignal<PaginationParams> = signal(null);

  protected addNewTransaction() {
    this.ref = this.dialogService.open(TransactionsCreateComponent, {
      header: 'Add New Transaction',
      modal: true,
      closeOnEscape: true,
      closable: true,
      width: '60vw',
      inputValues: {
        hidePortfolio: true,
      },
    });
  }
}
