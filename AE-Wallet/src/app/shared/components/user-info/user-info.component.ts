import { Component, Input } from '@angular/core';
import { UserDto } from '../../models/user.model';
import { NgIf } from '@angular/common';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgIf, MaterialModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  @Input() user: UserDto | null = null;

  constructor() {}

  logout() {}

  login() {}

  register() {
    //apre un dialog
  }
}
