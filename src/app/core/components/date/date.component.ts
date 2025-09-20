import { Component, input, InputSignal } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { DatePickerModule } from 'primeng/datepicker';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'wlt-input-date',
  imports: [IftaLabelModule, DatePickerModule, ReactiveFormsModule],
  template: `
    <p-iftalabel [class]="class()">
      <p-datepicker
        [inputId]="id()"
        [formControl]="control()"
        [size]="size()"
        [readonlyInput]="readonlyInput()"
        [showIcon]="showIcon()"
        [dateFormat]="dateFormat()"
        [placeholder]="placeholder()"
        class="w-full"
        autocomplete="off"
      />
      <label [for]="id()">{{ label() }}</label>
    </p-iftalabel>
  `,
})
export class InputDateRangeComponent {
  public readonly control: InputSignal<FormControl<Date | null>> =
    input.required();

  public readonly id: InputSignal<string> = input('datepicker');
  public readonly label: InputSignal<string> = input();
  public readonly size: InputSignal<'large' | 'small'> = input('large');
  public readonly class: InputSignal<string> = input();
  public readonly readonlyInput: InputSignal<boolean> = input(true);
  public readonly showIcon: InputSignal<boolean> = input(true);
  public readonly dateFormat: InputSignal<string> = input('dd/mm/yy');
  public readonly placeholder: InputSignal<string> = input();
}
