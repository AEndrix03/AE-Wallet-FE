import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  someEffect$ = createEffect(() => this.actions$.pipe());
}
