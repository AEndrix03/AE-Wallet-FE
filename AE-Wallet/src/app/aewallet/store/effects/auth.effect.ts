import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAction } from '../actions/auth.action';
import { filter, interval, map, startWith, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.login),
      tap(() => localStorage.removeItem('token')),
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

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.refreshToken),
      filter(() => !!localStorage.getItem('token')),
      switchMap(() =>
        interval(300000).pipe(
          startWith(0),
          switchMap(() => this.authService.refreshToken()),
          filter((res) => !!res.token),
          tap(({ token }) => localStorage.setItem('token', token))
        )
      ),
      map((token) => AuthAction.loginSuccess(token))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.logout),
      tap(() => localStorage.removeItem('token')),
      map(() => AuthAction.logoutSuccess())
    )
  );
}
