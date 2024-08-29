import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserDto } from '../../../shared/models/user.model';

export const AuthAction = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ mail: string; password: string }>(),
    'Login Success': props<{ token: string }>(),
    'Get User Info': emptyProps(),
    'Set User Info': props<{ user: UserDto }>(),
    'Refresh Token': emptyProps(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
  },
});
