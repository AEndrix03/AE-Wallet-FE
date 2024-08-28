import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAction } from '../actions/auth.action';
import { filter, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthState } from '../models/auth.model';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.login),
      switchMap(({ mail, password }) =>
        this.authService.login({ mail, password })
      ),
      filter((res) => !!res.token),
      tap(({ token }) => localStorage.setItem('token', token)),
      map((token) => AuthAction.loginSuccess(token))
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.loginSuccess),
      map(() => AuthAction.getUserInfo())
    )
  );

  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.getUserInfo),
      switchMap(() => this.authService.getUserInfo()),
      map((user) => AuthAction.setUserInfo({ user }))
    )
  );
}
