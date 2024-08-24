import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../shared/models/user.model';
import { selectIsAuthenticated, selectUser } from './selectors/auth.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(private store: Store) {
  }

  selectIsAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated);
  selectUser$: Observable<UserDto> = this.store.select(selectUser);

  login(user: any): void {
    this.store.dispatch(login({ user }));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
