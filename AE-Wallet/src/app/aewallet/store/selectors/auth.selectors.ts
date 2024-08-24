import { createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth-state.model';

const selectAuthState = (state: AuthState) => state;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.user != null
);

export const selectUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.user
);
