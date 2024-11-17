import { NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';

@Component({
  selector: 'app-table-utils',
  standalone: true,
  imports: [NgStyle, MaterialModule, NgIf],
  templateUrl: './table-utils.component.html',
  styleUrl: './table-utils.component.scss',
})
export class TableUtilsComponent {
  @Input() align:
    | 'left'
    | 'center'
    | 'right'
    | 'space-between'
    | 'space-around' = 'space-between';
  @Input() direction: 'row' | 'row-reverse' = 'row';
  @Input() results: number | null = null;
  @Input() disableResetFilter: boolean = true;

  @Output() filter = new EventEmitter<void>();
  @Output() resetFilter = new EventEmitter<void>();
}
