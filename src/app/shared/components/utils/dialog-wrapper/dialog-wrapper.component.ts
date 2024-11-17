import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-wrapper',
  standalone: true,
  imports: [MaterialModule, NgIf],
  templateUrl: './dialog-wrapper.component.html',
  styleUrl: './dialog-wrapper.component.scss',
})
export class DialogWrapperComponent {
  @Input() title: string = '';
  @Input() hideClose: boolean = false;

  @Output() close = new EventEmitter<void>();
}
