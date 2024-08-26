import { Component, Input } from '@angular/core';

import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserDto } from '../../models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MaterialModule, UserInfoComponent, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  @Input() user: UserDto | null = null; /*{
    id: 1,
    name: 'Andrea',
    surname: 'Redegalli',
    email: '',
  };*/

  homeRoute: string = 'home';
  walletsRoute: string = 'wallets';

  constructor(private router: Router) {}

  routeTo(route: string): void {
    this.router.navigate([route]);
  }
}
