import { Component, input, InputSignal, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'wlt-button',
  imports: [ButtonModule],
  template: ` <p-button
    type="button"
    [ariaLabel]="label()"
    [label]="label()"
    [icon]="icon()"
    [disabled]="disabled"
    [severity]="severity()"
    [size]="size()"
    [rounded]="rounded"
    [text]="text"
    [raised]="raised()"
    [outlined]="outlined()"
    [class]="class()"
    (onClick)="onClick.emit()"
  />`,
})
export class ButtonComponent {
  public readonly label: InputSignal<string> = input();
  public readonly icon: InputSignal<string> = input();
  public readonly class: InputSignal<string> = input();
  public readonly size: InputSignal<'small' | 'large' | null> = input();
  public readonly severity: InputSignal<'primary' | 'secondary' | 'success'> =
    input('primary');
  public readonly disabled: InputSignal<boolean> = input();
  public readonly rounded: InputSignal<boolean> = input();
  public readonly outlined: InputSignal<boolean> = input();
  public readonly raised: InputSignal<boolean> = input();
  public readonly text: InputSignal<boolean> = input();

  public readonly onClick = output<void>();
}
