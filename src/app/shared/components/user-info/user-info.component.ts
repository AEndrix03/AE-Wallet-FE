import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDto } from '../../models/user.model';
import { NgIf } from '@angular/common';
import { MaterialModule } from '../../modules/material.module';
import { LineCenteredTextComponent } from '../utils/line-centered-text/line-centered-text.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgIf, MaterialModule, LineCenteredTextComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  @Input() user: UserDto | null = null;

  @Output() logout = new EventEmitter<void>();
  @Output() login = new EventEmitter<void>();
  @Output() register = new EventEmitter<void>();
  @Output() settings = new EventEmitter<void>();
}
