import { Component, inject, input, InputSignal, output } from '@angular/core';
import { FiltersTemplateComponent } from '../../../../core/components/templates/filters-template/filters-template.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Currency } from '../../../../core/enums/core.enums';
import { TransactionTypeEnum } from '../../../../core/enums/transaction.enums';
import { InputTextComponent } from '../../../../core/components/input-text/input-text.component';
import { InputDateRangeComponent } from '../../../../core/components/date-range/date-range.component';
import { InputNumberComponent } from '../../../../core/components/input-number/input-number.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import {
  TransactionFilterDto,
  TransactionTypeDto,
} from '../../../../core/models/transaction.models';
import { DividerModule } from 'primeng/divider';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PortfolioTypeEnum } from '../../../../core/enums/portfolio.enums';

@Component({
  selector: 'wlt-transactions-filters',
  imports: [
    FiltersTemplateComponent,
    InputTextComponent,
    InputDateRangeComponent,
    InputNumberComponent,
    SelectComponent,
    DividerModule,
    ButtonComponent,
    ButtonComponent,
  ],
  templateUrl: './transactions-filters.component.html',
})
export class TransactionsFiltersComponent {
  /*public readonly portfoliosOptions: InputSignal<PortfolioDto[]> =
    input.required();*/
  public readonly transactionTypesOptions: InputSignal<TransactionTypeDto[]> =
    input.required();

  public readonly onSearch = output<TransactionFilterDto>();
  public readonly onReset = output<void>();
  public readonly onCreate = output<void>();

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

  public categoryFc(): FormControl<PortfolioTypeEnum> {
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
      { code: 'EUR', description: 'EUR' },
      { code: 'USD', description: 'USD' },
      { code: 'GBP', description: 'GBP' },
      { code: 'JPY', description: 'JPY' },
    ];
  }

  protected categoryOptions() {
    return [];
  }

  protected _onSearch(): void {
    if (this.form.valid) {
      this.onSearch.emit(this.form.getRawValue());
    }
  }

  protected _onReset(): void {
    this.form.reset();
    this.onReset.emit();
  }
}

interface TransactionFilter {
  description: FormControl<string>;
  amount: FormControl<number>;
  currency: FormControl<Currency>;
  category: FormControl<PortfolioTypeEnum>;
  type: FormControl<TransactionTypeEnum>;
  dateFrom: FormControl<Date>;
  dateTo: FormControl<Date>;

  portfolioId: FormControl<string>;
}
