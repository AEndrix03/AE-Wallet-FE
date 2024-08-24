import { UserDto } from '../../../shared/models/user.model';

export interface AuthState {
  user: UserDto | null;
  loading: boolean;
}
