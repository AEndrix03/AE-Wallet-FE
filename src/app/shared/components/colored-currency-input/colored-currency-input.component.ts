import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxCurrencyDirective } from 'ngx-currency';
import { MaterialModule } from '../../modules/material.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-colored-currency-input',
  standalone: true,
  imports: [NgxCurrencyDirective, MaterialModule, NgClass],
  templateUrl: './colored-currency-input.component.html',
  styleUrl: './colored-currency-input.component.scss',
})
export class ColoredCurrencyInputComponent implements OnChanges {
  @Input() value: number = 0;

  readValue: number = 0;
  isNegative: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'].currentValue !== undefined) {
      this.isNegative = changes['value'].currentValue < 0;
      this.readValue =
        (this.isNegative ? -1 : 1) * changes['value'].currentValue;
    }
  }
}
