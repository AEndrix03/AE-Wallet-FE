import {
  Component,
  effect,
  inject,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { AccordionComponent } from '../../../../../core/components/accordion/accordion.component';
import { PortfolioDto } from '../../../../../core/models/portfolio.models';
import { TransactionDto } from '../../../../../core/models/transaction.models';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TransactionsResultsComponent } from '../../../transactions/transactions-results/transactions-results.component';
import {
  DEFAULT_PAGINATION,
  Page,
  PaginationParams,
} from '../../../../../core/models/core.models';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { TransactionsCreateComponent } from '../../../transactions/transactions-create/transactions-create.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../../../core/services/transaction.service';
import { PortfolioService } from '../../../../../core/services/portfolio.service';
import {
  filter,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'wlt-portfolio-detail',
  imports: [
    AccordionComponent,
    DatePipe,
    TransactionsResultsComponent,
    ButtonComponent,
    AsyncPipe,
  ],
  templateUrl: './portfolio-detail.component.html',
  providers: [
    DialogService,
    DynamicDialogRef,
    PortfolioService,
    TransactionService,
  ],
})
export class PortfolioDetailComponent implements OnDestroy {
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly dialogService = inject(DialogService);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly portfolioService = inject(PortfolioService);
  private readonly transactionService = inject(TransactionService);

  public portfolio$: Observable<PortfolioDto> = of(null);
  public transactions$: Observable<Page<TransactionDto>> = of(null);

  public readonly portfolioId: WritableSignal<string> = signal(null);
  public readonly pagination: WritableSignal<PaginationParams> =
    signal(DEFAULT_PAGINATION);

  private readonly unsubscribe$ = new Subject();

  constructor() {
    this.activeRoute.queryParamMap
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((paramMap) => this.portfolioId.set(paramMap.get('id')))
      )
      .subscribe();

    effect(() => {
      const id = this.portfolioId();
      const pagination = this.pagination();
      if (id) {
        this.transactions$ = this.transactionService.getPortfolioTransactions(
          id,
          pagination
        );
      }
    });

    effect(() => {
      const id = this.portfolioId();
      if (id) {
        this.portfolio$ = this.portfolioService.getPortfolioById(id);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    if (this.ref) {
      this.ref.close();
    }
  }

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

    this.ref.onClose
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(Boolean),
        filter(() => this.portfolioId() != null),
        switchMap((transaction) =>
          this.transactionService.saveTransaction({
            ...transaction,
            portfolioId: this.portfolioId(),
          })
        ),
        take(1),
        tap(
          () =>
            (this.transactions$ =
              this.transactionService.getPortfolioTransactions(
                this.portfolioId(),
                this.pagination()
              ))
        )
      )
      .subscribe();
  }

  protected deleteTransaction(id: string) {
    this.transactionService
      .deleteTransaction(id)
      .pipe(
        take(1),
        tap(
          () =>
            (this.transactions$ =
              this.transactionService.getPortfolioTransactions(
                this.portfolioId(),
                this.pagination()
              ))
        )
      )
      .subscribe();
  }
}
