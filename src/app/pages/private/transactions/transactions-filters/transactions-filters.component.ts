import { Component, inject } from '@angular/core';
import { FiltersTemplateComponent } from '../../../../core/components/templates/filters-template/filters-template.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Currency, CURRENCY_SYMBOLS } from '../../../../core/enums/core.enums';
import {
  TransactionCategoryEnum,
  TransactionTypeEnum,
} from '../../../../core/enums/transaction.enums';
import { InputTextComponent } from '../../../../core/components/input-text/input-text.component';
import { InputDateRangeComponent } from '../../../../core/components/date-range/date-range.component';
import { InputNumberComponent } from '../../../../core/components/input-number/input-number.component';
import { Select } from '../../../../core/components/select/select';

@Component({
  selector: 'wlt-transactions-filters',
  imports: [
    FiltersTemplateComponent,
    InputTextComponent,
    InputDateRangeComponent,
    InputNumberComponent,
    Select,
  ],
  templateUrl: './transactions-filters.component.html',
})
export class TransactionsFiltersComponent {
  private readonly form: FormGroup<TransactionFilter>;
  private readonly _fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.form = this._fb.group({
      description: this._fb.control(''),
      amount: this._fb.control(null),
      currency: this._fb.control(null),
      category: this._fb.control(null),
      type: this._fb.control(null),
      dateFrom: this._fb.control(null),
      dateTo: this._fb.control(null),
      portfolioId: this._fb.control(''),
    });
  }

  public descriptionFc(): FormControl<string> {
    return this.form.controls.description;
  }

  public amountFc(): FormControl<number> {
    return this.form.controls.amount;
  }

  public currencyFc(): FormControl<Currency> {
    return this.form.controls.currency;
  }

  public categoryFc(): FormControl<TransactionCategoryEnum> {
    return this.form.controls.category;
  }

  public typeFc(): FormControl<TransactionTypeEnum> {
    return this.form.controls.type;
  }

  public dateFromFc(): FormControl<Date> {
    return this.form.controls.dateFrom;
  }

  public dateToFc(): FormControl<Date> {
    return this.form.controls.dateTo;
  }

  public portfolioIdFc(): FormControl<string> {
    return this.form.controls.portfolioId;
  }

  protected currencyOptions() {
    return [
      { code: 'EUR', description: CURRENCY_SYMBOLS.EUR },
      { code: 'USD', description: CURRENCY_SYMBOLS.USD },
      { code: 'GBP', description: CURRENCY_SYMBOLS.GBP },
      { code: 'JPY', description: CURRENCY_SYMBOLS.JPY },
    ];
  }

  protected categoryOptions() {
    return Object.values(TransactionCategoryEnum).map((category) => ({
      code: category,
      description: category,
    }));
  }

  protected typeOptions() {
    return Object.values(TransactionTypeEnum).map((type) => ({
      code: type,
      description: type,
    }));
  }
}

interface TransactionFilter {
  description: FormControl<string>;
  amount: FormControl<number>;
  currency: FormControl<Currency>;
  category: FormControl<TransactionCategoryEnum>;
  type: FormControl<TransactionTypeEnum>;
  dateFrom: FormControl<Date>;
  dateTo: FormControl<Date>;

  portfolioId: FormControl<string>;
}
