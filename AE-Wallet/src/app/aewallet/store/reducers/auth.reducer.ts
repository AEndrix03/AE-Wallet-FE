import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from '../models/auth-state.model';
import { AuthAction } from '../actions/auth.action';

export const initialState: AuthState = {
  user: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,
  on(AuthAction.login, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthAction.loginSuccess, (state, { user }) => ({
    user,
    loading: false,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
