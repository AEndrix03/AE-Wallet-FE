import { UserDto } from '../../../shared/models/user.model';

/*export interface AuthState {
  user: UserDto | null;
  loading: boolean;
}*/

export interface WalletDto {
  id: number;
  name: string;
  description: string;
  headerColor: string;
  headerBackgroundColor: string;
}
