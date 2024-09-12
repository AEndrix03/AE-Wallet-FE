import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  WalletDto,
  WalletsState,
  WalletCreateDto,
  EntryDto,
} from './models/wallet.model';
import {
  selectAllWallets,
  selectIsLoading,
  selectPatchedEntries,
  selectPatchedWallet,
  selectSelectedEntries,
  selectSelectedWallet,
} from './selectors/wallets.selectors';
import { WalletAction } from './actions/wallets.action';

@Injectable({
  providedIn: 'root',
})
export class WalletFacadeService {
  constructor(private store: Store<WalletsState>) {}

  selectAllWallets$: Observable<WalletDto[]> =
    this.store.select(selectAllWallets);
  selectIsLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  selectSelectedWallet$: Observable<WalletDto | null> =
    this.store.select(selectSelectedWallet);
  selectPatchedWallet$: Observable<WalletDto | null> =
    this.store.select(selectPatchedWallet);
  selectSelectedEntries$: Observable<EntryDto[]> = this.store.select(
    selectSelectedEntries
  );
  selectPatchedEntries$: Observable<EntryDto[]> =
    this.store.select(selectPatchedEntries);

  dispatchLoadAllWallets(): void {
    this.store.dispatch(WalletAction.loadAllWallets());
  }

  dispatchEditWallet(walletId: number): void {
    this.store.dispatch(WalletAction.editWallet({ walletId }));
  }

  dispatchCreateWallet(walletCreate: WalletCreateDto): void {
    this.store.dispatch(WalletAction.createWallet({ walletCreate }));
  }

  dispatchDeleteWallet(walletId: number): void {
    this.store.dispatch(WalletAction.deleteWallet({ walletId }));
  }
}