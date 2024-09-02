import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../shared/models/user.model';
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectUser,
} from './selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { AuthState } from './models/auth.model';
import { AuthAction } from './actions/auth.action';
import { WalletDto, WalletsState } from './models/wallet.model';
import { selectAllWallets } from './selectors/wallets.selectors';
import { WalletAction } from './actions/wallets.action';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  constructor(private store: Store<WalletsState>) {}

  selectAllWallets$: Observable<WalletDto[]> =
    this.store.select(selectAllWallets);

  dispatchLoadAllWallets(userId: number): void {
    this.store.dispatch(WalletAction.loadAllWallets({ userId }));
  }

  dispatchEditWallet(walletId: number): void {
    this.store.dispatch(WalletAction.editWallet({ walletId }));
  }
}
