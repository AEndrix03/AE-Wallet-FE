import { Component, input, InputSignal } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'wlt-select',
  imports: [IftaLabelModule, SelectModule, ReactiveFormsModule],
  template: `
    <p-iftalabel [class]="class()">
      <p-select
        [formControl]="control()"
        [inputId]="label()"
        [options]="options()"
        [size]="size()"
        [optionLabel]="optionLabel()"
        [optionValue]="optionValue()"
        [showClear]="showClear()"
        appendTo="body"
        class="w-full"
      />
      <label [for]="label()">{{ label() }}</label>
    </p-iftalabel>
  `,
})
export class SelectComponent<T, L> {
  public readonly control: InputSignal<FormControl<T>> = input.required();
  public readonly options: InputSignal<L[]> = input.required();

  public readonly label: InputSignal<string> = input();
  public readonly optionLabel: InputSignal<string> = input('code');
  public readonly optionValue: InputSignal<string> = input('description');
  public readonly size: InputSignal<'large' | 'small'> = input('large');
  public readonly class: InputSignal<string> = input('min-w-[8rem]');

  public readonly showClear: InputSignal<boolean> = input(false);
}
