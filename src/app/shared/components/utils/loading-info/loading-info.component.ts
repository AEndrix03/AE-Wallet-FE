import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-info',
  standalone: true,
  imports: [MaterialModule, NgIf],
  templateUrl: './loading-info.component.html',
  styleUrl: './loading-info.component.scss',
})
export class LoadingInfoComponent {
  @Input() isLoading: boolean = false;
}
