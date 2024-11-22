import { UserDto } from '../../../shared/models/user.model';

export interface AuthState {
  user: UserDto | null;
  loading: boolean;
}

export interface LoginDto {
  mail: string;
  password: string;
}

export interface TokenDto {
  token: string;
}
