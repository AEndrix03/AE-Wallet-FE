import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { AuthFacadeService } from '../store/auth-facade.service';
import { Observable, of } from 'rxjs';
import { UserDto } from '../../shared/models/user.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedUser$: Observable<UserDto | null> = of(null);

  constructor(private authFacade: AuthFacadeService) {
    this.selectedUser$ = this.authFacade.selectUser$;
  }
}
