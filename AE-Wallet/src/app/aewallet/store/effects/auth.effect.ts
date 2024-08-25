import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAction } from '../actions/auth.action';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password)
      ),
      map((token) => AuthAction.loginSuccess({ token }))
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.loginSuccess),
      map(({ token }) => AuthAction.loginSuccess({ token }))
    )
  );

  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.getUserInfo),
      switchMap(({ token }) => this.authService.getUserInfo(token)),
      map((user) => AuthAction.setUserInfo({ user }))
    )
  );
}
