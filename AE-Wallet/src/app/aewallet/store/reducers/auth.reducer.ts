import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../models/auth.model';
import { AuthAction } from '../actions/auth.action';

export const initialState: AuthState = {
  user: null,
  loading: false,
};

export const authFeatureKey = 'auth';

const _authReducer = createReducer(
  initialState,
  on(AuthAction.login, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthAction.loginSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(AuthAction.setUserInfo, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthAction.refreshToken, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthAction.logout, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthAction.logoutSuccess, (state) => ({
    ...state,
    user: null,
    loading: false,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
