import { Component, input, InputSignal, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'wlt-button',
  imports: [ButtonModule],
  template: ` <p-button
    [ariaLabel]="label()"
    [label]="label()"
    [icon]="icon()"
    [disabled]="disabled()"
    [severity]="severity()"
    [size]="size()"
    [rounded]="rounded()"
    [text]="text()"
    [raised]="raised()"
    [outlined]="outlined()"
    [loading]="loading()"
    [class]="class()"
    (onClick)="onClick.emit()"
  />`,
})
export class ButtonComponent {
  public readonly label: InputSignal<string> = input('');
  public readonly icon: InputSignal<string> = input('');
  public readonly class: InputSignal<string> = input('');
  public readonly size: InputSignal<'small' | 'large' | null> = input();
  public readonly severity: InputSignal<'primary' | 'secondary' | 'success'> =
    input('primary');
  public readonly disabled: InputSignal<boolean> = input(false);
  public readonly rounded: InputSignal<boolean> = input(false);
  public readonly outlined: InputSignal<boolean> = input(false);
  public readonly raised: InputSignal<boolean> = input(false);
  public readonly text: InputSignal<boolean> = input(false);

  public readonly loading: InputSignal<boolean> = input(false);

  public readonly onClick = output<void>();
}
