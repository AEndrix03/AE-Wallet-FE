import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TransactionTypeEnum } from '../../../../core/enums/transaction.enums';
import { Currency, CURRENCY_SYMBOLS } from '../../../../core/enums/core.enums';

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
  ],
})
export class TransactionsCreateComponent implements AfterViewInit, OnDestroy {
  public readonly form: FormGroup;
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  private readonly unsubscribe$ = new Subject<void>();

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
      { code: 'EUR', description: CURRENCY_SYMBOLS.EUR },
      { code: 'USD', description: CURRENCY_SYMBOLS.USD },
      { code: 'GBP', description: CURRENCY_SYMBOLS.GBP },
      { code: 'JPY', description: CURRENCY_SYMBOLS.JPY },
    ];
  }

  public typeOptions() {
    return [
      { code: TransactionTypeEnum.INCOME, description: 'INCOME' },
      { code: TransactionTypeEnum.EXPENSE, description: 'EXPENSE' },
      { code: TransactionTypeEnum.TRANSFER, description: 'TRANSFER' },
    ];
  }

  public portfolioOptions() {
    // Da sostituire con chiamata reale
    return [
      { code: '1', description: 'Portfolio Principale' },
      { code: '2', description: 'Risparmi' },
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
    this.ref.close(this.form.getRawValue());
  }
}
