import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextComponent } from '../../../../../core/components/input-text/input-text.component';
import { InputNumberComponent } from '../../../../../core/components/input-number/input-number.component';
import { SelectComponent } from '../../../../../core/components/select/select.component';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { finalize, Subject, take } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PortfolioTypeEnum } from '../../../../../core/enums/portfolio.enums';
import { Currency } from '../../../../../core/enums/core.enums';
import { PortfolioService } from '../../../../../core/services/portfolio.service';
import { userStore } from '@aredegalli/ng-auth';
import {
  PortfolioDto,
  PortfolioSaveDto,
} from '../../../../../core/models/portfolio.models';

@Component({
  selector: 'wlt-portfolio-create',
  templateUrl: './portfolio-create.component.html',
  imports: [
    ReactiveFormsModule,
    InputTextComponent,
    InputNumberComponent,
    SelectComponent,
    ButtonComponent,
  ],
  providers: [PortfolioService],
})
export class PortfolioCreateComponent implements OnDestroy {
  public readonly portfolioTypeOptions: InputSignal<PortfolioTypeEnum[]> =
    input.required();
  public readonly portfolio: InputSignal<PortfolioDto> = input();

  public readonly form: FormGroup;
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly portfolioService = inject(PortfolioService);
  private readonly userStore = inject(userStore);

  private readonly unsubscribe$ = new Subject<void>();
  protected readonly isSaving: WritableSignal<boolean> = signal(false);

  constructor() {
    this.form = this._fb.group({
      name: this._fb.control('', [Validators.required]),
      type: this._fb.control(PortfolioTypeEnum.CHECKING, [Validators.required]),
      balance: this._fb.control(0, [Validators.required, Validators.min(0)]),
      target: this._fb.control(null),
      image: this._fb.control(''),
      currency: this._fb.control('EUR' as Currency, [Validators.required]),
    });

    effect(() => {
      const portfolio = this.portfolio();
      if (portfolio) {
        this.form.patchValue(portfolio);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public nameFc(): FormControl<string> {
    return this.form.controls['name'] as FormControl<string>;
  }

  public typeFc(): FormControl<PortfolioTypeEnum> {
    return this.form.controls['type'] as FormControl<PortfolioTypeEnum>;
  }

  public balanceFc(): FormControl<number> {
    return this.form.controls['balance'] as FormControl<number>;
  }

  public targetFc(): FormControl<number | null> {
    return this.form.controls['target'] as FormControl<number | null>;
  }

  public imageFc(): FormControl<string> {
    return this.form.controls['image'] as FormControl<string>;
  }

  public currencyFc(): FormControl<Currency> {
    return this.form.controls['currency'] as FormControl<Currency>;
  }

  public currencyOptions() {
    return [
      { code: 'EUR', description: 'EUR' },
      { code: 'USD', description: 'USD' },
      { code: 'GBP', description: 'GBP' },
      { code: 'JPY', description: 'JPY' },
    ];
  }

  public onBack() {
    this.ref.close(null);
  }

  public onSave() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      const userId = this.userStore.user()?.id;

      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const portfolioSaveDto: PortfolioSaveDto = {
        ...formValue,
        id: this.portfolio()?.id || '',
        userId: userId,
        lastUpdated: new Date(),
        type: formValue.type.toUpperCase(),
      };

      this.isSaving.set(true);
      this.portfolioService
        .savePortfolio(portfolioSaveDto)
        .pipe(
          take(1),
          finalize(() => this.isSaving.set(false))
        )
        .subscribe({
          next: (result) => {
            this.ref.close(result);
          },
          error: (error) => {
            console.error('Error saving portfolio:', error);
          },
        });
    }
  }

  public isFormValid(): boolean {
    return this.form.valid;
  }
}
