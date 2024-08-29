import { Component, Input } from '@angular/core';

import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserDto } from '../../models/user.model';
import { NgIf } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { LoginComponent } from '../login/login.component';
import { AuthFacadeService } from '../../../aewallet/store/auth-facade.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MaterialModule, UserInfoComponent, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  @Input() user: UserDto | null = null;

  homeRoute: string = 'home';
  walletsRoute: string = 'wallets';

  constructor(
    private router: Router,
    private alert: AlertService,
    private authFacade: AuthFacadeService
  ) {}

  routeTo(route: string): void {
    this.router.navigate([route]);
  }

  openLogin() {
    this.alert.openDialog(LoginComponent);
  }

  confirmLogout() {
    this.alert
      .openConfirmDialog({
        message: 'Are you sure you want to logout?',
      })
      .pipe(tap(() => this.authFacade.dispatchLogout()))
      .subscribe();
  }
}
