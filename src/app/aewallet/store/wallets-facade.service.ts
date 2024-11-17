import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  WalletDto,
  WalletsState,
  WalletCreateDto,
  EntryDto,
  EntryFilterDto,
} from './models/wallet.model';
import {
  selectAllWallets,
  selectBalance,
  selectIsLoading,
  selectFilteredEntries,
  selectPatchedWallet,
  selectSelectedEntries,
  selectSelectedWallet,
  selectWalletId,
  selectEntriesFilter,
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
  selectFilteredEntries$: Observable<EntryDto[]> = this.store.select(
    selectFilteredEntries
  );
  selectWalletId$: Observable<number> = this.store.select(selectWalletId);
  selectBalance$: Observable<number> = this.store.select(selectBalance);
  selectEntriesFilter$: Observable<EntryFilterDto> =
    this.store.select(selectEntriesFilter);

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

  dispatchLoadWalletEntries(walletId: number): void {
    this.store.dispatch(WalletAction.loadWalletEntries({ walletId }));
  }

  dispatchReloadWalletEntries(): void {
    this.store.dispatch(WalletAction.reloadWalletEntries());
  }

  dispatchUpdateWallet(wallet: WalletDto): void {
    this.store.dispatch(WalletAction.updateWallet({ wallet }));
  }

  dispatchSaveWallet(): void {
    this.store.dispatch(WalletAction.saveWallet());
  }

  dispatchFilterEntries(filter: EntryDto): void {
    this.store.dispatch(WalletAction.filterEntries({ filter }));
  }

  dispatchResetFilter(): void {
    this.store.dispatch(WalletAction.resetFilter());
  }
}
