import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MaterialModule } from '../../../../shared/modules/material.module';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel,
  Validators,
} from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormContainerComponent } from '../../../../shared/components/utils/form-container/form-container.component';
import { WalletDto } from '../../../store/models/wallet.model';
import { filter, map, Subject, take, takeUntil, tap } from 'rxjs';
import { ColoredCurrencyInputComponent } from "../../../../shared/components/colored-currency-input/colored-currency-input.component";

@Component({
  selector: 'app-wallet-info',
  standalone: true,
  imports: [MaterialModule, ColorPickerModule, FormContainerComponent, ColoredCurrencyInputComponent],
  templateUrl: './wallet-info.component.html',
  styleUrl: './wallet-info.component.scss',
})
export class WalletInfoComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() wallet: WalletDto;
  @Input() balance: number = 0;

  @Output() edit = new EventEmitter<WalletDto>();
  @Output() save = new EventEmitter();

  fg: FormGroup<WalletDetailForm> = null;

  unsubscribe$ = new Subject<void>();

  constructor(private _fb: FormBuilder) {
    this.fg = this._fb.group({
      name: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      description: new FormControl(''),
      headerColor: new FormControl(''),
      headerBackgroundColor: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.['wallet'].currentValue) {
      this.fg.patchValue({
        name: this.wallet.name,
        description: this.wallet.description,
        headerColor: this.wallet.headerColor,
        headerBackgroundColor: this.wallet.headerBackgroundColor,
      });
    }
  }

  ngAfterViewInit(): void {
    this.fg.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(() => this.fg.valid),
        map(() => this.buildUpdateDto()),
        tap(() => this.edit.emit(this.buildUpdateDto()))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  buildUpdateDto(): WalletDto {
    return {
      ...this.wallet,
      name: this.nameFc.value,
      description: this.descriptionFc.value,
      headerColor: this.headerColorFc.value,
      headerBackgroundColor: this.headerBackgroundColorFc.value,
    };
  }

  get nameFc(): FormControl<string> {
    return this.fg.get('name') as FormControl<string>;
  }

  get descriptionFc(): FormControl<string> {
    return this.fg.get('description') as FormControl<string>;
  }

  get headerColorFc(): FormControl<string> {
    return this.fg.get('headerColor') as FormControl<string>;
  }

  get headerBackgroundColorFc(): FormControl<string> {
    return this.fg.get('headerBackgroundColor') as FormControl<string>;
  }

  patchHeaderColor(color: string): void {
    this.headerColorFc.patchValue(color);
  }

  patchHeaderBackgroundColor(color: string): void {
    this.headerBackgroundColorFc.patchValue(color);
  }
}

export interface WalletDetailForm {
  name: FormControl<string>;
  description: FormControl<string>;
  headerColor: FormControl<string>;
  headerBackgroundColor: FormControl<string>;
}
