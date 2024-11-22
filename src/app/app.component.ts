import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFacadeService } from './aewallet/store/auth-facade.service';
import { Observable, of } from 'rxjs';
import { UserDto } from './shared/models/user.model';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'AE-Wallet';
  selectedUser$: Observable<UserDto | null> = of(null);

  constructor(private authFacade: AuthFacadeService) {
    this.selectedUser$ = this.authFacade.selectUser$;
  }

  ngOnInit(): void {
    this.authFacade.dispatchRefreshToken();
  }
}
