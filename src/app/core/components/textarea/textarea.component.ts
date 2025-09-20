import { Component, input, InputSignal } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'wlt-textarea',
  imports: [IftaLabelModule, TextareaModule, ReactiveFormsModule],
  template: `
    <p-iftalabel [class]="class()">
      <textarea
        pTextarea
        [id]="id()"
        [formControl]="control()"
        class="w-full"
        autocomplete="off"
      ></textarea>
      <label [for]="id()">{{ label() }}</label>
    </p-iftalabel>
  `,
})
export class TextareaComponent {
  public readonly control: InputSignal<FormControl<string>> = input.required();

  public readonly id: InputSignal<string> = input();
  public readonly label: InputSignal<string> = input();
  public readonly size: InputSignal<'large' | 'small' | null> = input();
  public readonly class: InputSignal<string> = input();
}
