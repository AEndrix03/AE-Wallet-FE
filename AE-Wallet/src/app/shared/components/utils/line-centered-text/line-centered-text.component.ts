import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line-centered-text',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './line-centered-text.component.html',
  styleUrl: './line-centered-text.component.scss',
})
export class LineCenteredTextComponent {
  @Input() text: string = '';
  @Input() lineStyle: 'solid' | 'dotted' | 'dashed' = 'solid';
  @Input() color: string = '#333';
  @Input() width: string = '20px';
}
