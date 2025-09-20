import { Component, effect, input, InputSignal } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { DatePickerModule } from 'primeng/datepicker';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'wlt-input-date-range',
  imports: [IftaLabelModule, DatePickerModule, ReactiveFormsModule],
  template: `
    <p-iftalabel [class]="class()">
      <p-datepicker
        [inputId]="id()"
        [formControl]="rangeControl"
        [size]="size()"
        selectionMode="range"
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
  public readonly fromControl: InputSignal<FormControl<Date | null>> =
    input.required();
  public readonly toControl: InputSignal<FormControl<Date | null>> =
    input.required();

  public readonly id: InputSignal<string> = input('date-range');
  public readonly label: InputSignal<string> = input();
  public readonly size: InputSignal<'large' | 'small'> = input('large');
  public readonly class: InputSignal<string> = input();
  public readonly readonlyInput: InputSignal<boolean> = input(true);
  public readonly showIcon: InputSignal<boolean> = input(true);
  public readonly dateFormat: InputSignal<string> = input('dd/mm/yy');
  public readonly placeholder: InputSignal<string> = input('From - To');

  public readonly rangeControl = new FormControl<Date[] | null>(null);

  constructor() {
    effect(() => {
      const from = this.fromControl().value;
      const to = this.toControl().value;

      if (from || to) {
        this.rangeControl.setValue([from, to].filter(Boolean) as Date[], {
          emitEvent: false,
        });
      } else {
        this.rangeControl.setValue(null, { emitEvent: false });
      }
    });

    this.rangeControl.valueChanges.subscribe((range) => {
      if (range && range.length >= 1) {
        this.fromControl().setValue(range[0] || null);
        this.toControl().setValue(range[1] || null);
      } else {
        this.fromControl().setValue(null);
        this.toControl().setValue(null);
      }
    });
  }
}
