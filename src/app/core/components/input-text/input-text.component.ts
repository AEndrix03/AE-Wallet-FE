import { Component, input, InputSignal } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'wlt-input-text',
  imports: [IftaLabelModule, InputTextModule, ReactiveFormsModule],
  template: `
    <p-iftalabel [class]="class()">
      <input
        pInputText
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
export class InputTextComponent {
  public readonly control: InputSignal<FormControl<string>> = input.required();

  public readonly id: InputSignal<string> = input('input-text');
  public readonly label: InputSignal<string> = input();
  public readonly size: InputSignal<'large' | 'small'> = input('large');
  public readonly class: InputSignal<string> = input();
}
