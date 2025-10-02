import {
  AfterViewInit,
  Component,
  inject,
  input,
  InputSignal,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextareaComponent } from '../../../../core/components/textarea/textarea.component';
import { InputNumberComponent } from '../../../../core/components/input-number/input-number.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { InputDateRangeComponent } from '../../../../core/components/date/date.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TransactionTypeEnum } from '../../../../core/enums/transaction.enums';
import { Currency } from '../../../../core/enums/core.enums';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { TransactionService } from '../../../../core/services/transaction.service';
import { TransactionTypeDto } from '../../../../core/models/transaction.models';
import { PortfolioDto } from '../../../../core/models/portfolio.models';
import { userStore } from '@aredegalli/ng-auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'wlt-transactions-create',
  templateUrl: './transactions-create.component.html',
  imports: [
    ReactiveFormsModule,
    TextareaComponent,
    InputNumberComponent,
    SelectComponent,
    InputDateRangeComponent,
    ButtonComponent,
    AsyncPipe,
  ],
  providers: [PortfolioService, TransactionService],
})
export class TransactionsCreateComponent implements AfterViewInit, OnDestroy {
  public readonly hidePortfolio: InputSignal<boolean> = input(false);

  public readonly form: FormGroup;
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  private readonly unsubscribe$ = new Subject<void>();

  private readonly userStore = inject(userStore);
  private readonly portfolioService: PortfolioService =
    inject(PortfolioService);
  private readonly transactionService: TransactionService =
    inject(TransactionService);

  protected readonly transactionTypes$: Observable<TransactionTypeDto[]> =
    this.transactionService.getAllTransactionTypes().pipe(
      map((v) =>
        v.map((t) => ({
          ...t,
          description: t.description.toUpperCase(),
        }))
      )
    );
  protected readonly userPortfolios$: Observable<PortfolioDto[]> =
    this.portfolioService.getAllUserPortfolios(this.userStore.user()?.id);

  constructor() {
    this.form = this._fb.group({
      description: this._fb.control(''),
      amount: this._fb.control(null),
      currency: this._fb.control('EUR'),
      type: this._fb.control(TransactionTypeEnum.INCOME),
      date: this._fb.control(new Date()),
      note: this._fb.control(''),
      portfolioId: this._fb.control(''),
    });
  }

  ngAfterViewInit() {
    this.amountFc()
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => this.onAmountChange(value));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public descriptionFc(): FormControl<string> {
    return this.form.controls['description'] as FormControl<string>;
  }

  public amountFc(): FormControl<number> {
    return this.form.controls['amount'] as FormControl<number>;
  }

  public currencyFc(): FormControl<Currency> {
    return this.form.controls['currency'] as FormControl<Currency>;
  }

  public typeFc(): FormControl<TransactionTypeEnum> {
    return this.form.controls['type'] as FormControl<TransactionTypeEnum>;
  }

  public dateFc(): FormControl<Date> {
    return this.form.controls['date'] as FormControl<Date>;
  }

  public noteFc(): FormControl<string> {
    return this.form.controls['note'] as FormControl<string>;
  }

  public portfolioIdFc(): FormControl<string> {
    return this.form.controls['portfolioId'] as FormControl<string>;
  }

  public currencyOptions() {
    return [
      { code: 'EUR', description: 'EUR' },
      { code: 'USD', description: 'USD' },
      { code: 'GBP', description: 'GBP' },
      { code: 'JPY', description: 'JPY' },
    ];
  }

  public onAmountChange(value: number | null) {
    if (value === null || value === undefined || value === 0) {
      this.typeFc().setValue(TransactionTypeEnum.INCOME);
    } else if (value < 0) {
      this.typeFc().setValue(TransactionTypeEnum.EXPENSE);
    }
  }

  public onBack() {
    this.ref.close(null);
  }

  public onSave() {
    this.ref.close({
      ...this.form.getRawValue(),
      type: this.typeFc().value?.toString()?.toUpperCase(),
    });
  }
}
