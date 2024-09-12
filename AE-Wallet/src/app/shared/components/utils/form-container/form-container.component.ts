import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [MaterialModule, NgIf],
  styleUrl: './form-container.component.scss',
  templateUrl: './form-container.component.html',
})
export class FormContainerComponent {
  @Input() title: string = '';
  @Input() hideAdd: boolean = true;

  @Output() add = new EventEmitter<void>();
}
