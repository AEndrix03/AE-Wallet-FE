import { Component, input, InputSignal } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'wlt-input-number',
  imports: [IftaLabelModule, InputNumberModule, ReactiveFormsModule],
  template: `
    <p-iftalabel [class]="class()">
      <p-inputNumber
        [id]="id()"
        [formControl]="control()"
        [size]="size()"
        class="w-full"
        autocomplete="off"
      />
      <label [for]="id()">{{ label() }}</label>
    </p-iftalabel>
  `,
})
export class InputNumberComponent {
  public readonly control: InputSignal<FormControl<number>> = input.required();

  public readonly id: InputSignal<string> = input('input-number');
  public readonly label: InputSignal<string> = input();
  public readonly size: InputSignal<'large' | 'small'> = input('large');
  public readonly class: InputSignal<string> = input();
}
