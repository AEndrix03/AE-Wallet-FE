import { createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth.model';

export const selectAuthState = (state: AuthState) => state;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.user != null
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);
