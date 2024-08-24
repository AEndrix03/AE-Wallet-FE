import { Component } from '@angular/core';

import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  homeRoute: string = 'home';
  walletsRoute: string = 'wallets';

  constructor(private router: Router) {}

  routeTo(route: string): void {
    this.router.navigate([route]);
  }
}
