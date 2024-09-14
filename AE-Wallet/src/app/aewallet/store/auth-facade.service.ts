import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../shared/models/user.model';
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectUser,
} from './selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { AuthState } from './models/auth.model';
import { AuthAction } from './actions/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  constructor(private store: Store<AuthState>) {}

  selectIsAuthenticated$: Observable<boolean> = this.store.select(
    selectIsAuthenticated
  );
  selectUser$: Observable<UserDto | null> = this.store.select(selectUser);
  selectIsLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  dispatchLogin(mail: string, password: string): void {
    this.store.dispatch(AuthAction.login({ mail, password }));
  }

  dispatchGetUserInfo(): void {
    this.store.dispatch(AuthAction.getUserInfo());
  }

  dispatchRefreshToken(): void {
    this.store.dispatch(AuthAction.refreshToken());
  }

  dispatchLogout(): void {
    this.store.dispatch(AuthAction.logout());
  }
}
