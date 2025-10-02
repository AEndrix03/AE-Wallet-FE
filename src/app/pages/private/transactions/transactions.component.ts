import {
  Component,
  effect,
  inject,
  OnDestroy,
  signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import { TransactionsFiltersComponent } from './transactions-filters/transactions-filters.component';
import { TransactionsResultsComponent } from './transactions-results/transactions-results.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TransactionsCreateComponent } from './transactions-create/transactions-create.component';
import {
  TransactionDto,
  TransactionFilterDto,
  TransactionTypeDto,
} from '../../../core/models/transaction.models';
import { TransactionService } from '../../../core/services/transaction.service';
import {
  DEFAULT_PAGINATION,
  Page,
  PaginationParams,
} from '../../../core/models/core.models';
import {
  BehaviorSubject,
  filter,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { userStore } from '@aredegalli/ng-auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'wlt-transactions',
  imports: [
    TransactionsFiltersComponent,
    TransactionsResultsComponent,
    AsyncPipe,
  ],
  templateUrl: './transactions.component.html',
  providers: [DialogService, DynamicDialogRef, TransactionService],
})
export class TransactionsComponent implements OnDestroy {
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly dialogService = inject(DialogService);
  private readonly transactionService = inject(TransactionService);
  private readonly userStore = inject(userStore);

  protected readonly transactions$: Observable<Page<TransactionDto>>;
  protected readonly transactionTypes$: Observable<TransactionTypeDto[]>;
  private readonly transactionsSubject: Subject<Partial<TransactionFilterDto>> =
    new BehaviorSubject(null);
  private readonly unsubscribe$: Subject<void> = new Subject();

  protected readonly pagination: WritableSignal<PaginationParams> =
    signal(DEFAULT_PAGINATION);
  protected readonly filter: WritableSignal<Partial<TransactionFilterDto>> =
    signal({});

  constructor() {
    this.transactions$ = this.transactionsSubject.asObservable().pipe(
      takeUntil(this.unsubscribe$),
      switchMap((filter) =>
        this.transactionService.getUserTransactionsFiltered(
          this.userStore.user()?.id,
          filter,
          this.pagination()
        )
      )
    );

    this.transactionTypes$ = this.transactionService.getAllTransactionTypes();

    effect(() => {
      const _ = this.pagination();
      this.transactionsSubject.next(untracked(() => this.filter()));
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected addNewTransaction() {
    this.ref = this.dialogService.open(TransactionsCreateComponent, {
      header: 'Add New Transaction',
      modal: true,
      closeOnEscape: true,
      closable: true,
      width: '60vw',
    });

    this.ref.onClose
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(Boolean),
        switchMap((transaction) =>
          this.transactionService.saveTransaction(transaction)
        ),
        take(1),
        tap(() => this.transactionsSubject.next(untracked(() => this.filter())))
      )
      .subscribe();
  }

  protected searchTransactions(filter: Partial<TransactionFilterDto>) {
    this.filter.set(filter);
    this.transactionsSubject.next(filter);
  }
}
