import { Component } from '@angular/core';

import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserDto } from '../../models/user.model';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MaterialModule, UserInfoComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  homeRoute: string = 'home';
  walletsRoute: string = 'wallets';

  user: UserDto | null = {
    id: 1,
    name: 'Andrea',
    surname: 'Redegalli',
    email: '',
  };

  constructor(private router: Router) {}

  routeTo(route: string): void {
    this.router.navigate([route]);
  }
}
