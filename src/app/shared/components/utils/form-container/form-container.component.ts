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
  @Input() hideRefresh: boolean = true;
  @Input() hideSearch: boolean = true;
  @Input() hideSave: boolean = true;

  @Output() add = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();
  @Output() search = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
}
