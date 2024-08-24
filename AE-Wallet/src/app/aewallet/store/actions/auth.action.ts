import { createActionGroup, props } from '@ngrx/store';
import { UserDto } from '../../../shared/models/user.model';

export const AuthAction = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ username: string; password: string }>(),
    'Login Success': props<{ user: UserDto }>(),
  },
});
