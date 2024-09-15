import { createFeatureSelector, createSelector } from '@ngrx/store';
import { walletsFeatureKey } from '../reducers/wallets.reducer';
import { WalletsState } from '../models/wallet.model';

export const selectWalletState =
  createFeatureSelector<WalletsState>(walletsFeatureKey);

export const selectAllWallets = createSelector(
  selectWalletState,
  (state: WalletsState) => state.allWallets || []
);

export const selectSelectedWallet = createSelector(
  selectWalletState,
  (state: WalletsState) => state.selectedWallet
);

export const selectPatchedWallet = createSelector(
  selectWalletState,
  (state: WalletsState) => state.patchedWallet
);

export const selectIsLoading = createSelector(
  selectWalletState,
  (state: WalletsState) => state.loading
);

export const selectSelectedEntries = createSelector(
  selectWalletState,
  (state: WalletsState) => state.selectedEntries || []
);

export const selectFilteredEntries = createSelector(
  selectWalletState,
  (state: WalletsState) => state.filteredEntries || []
);

export const selectWalletId = createSelector(
  selectSelectedWallet,
  (wallet) => wallet?.id
);

export const selectBalance = createSelector(
  selectWalletState,
  (state: WalletsState) => state.balance
);

export const selectEntriesFilter = createSelector(
  selectWalletState,
  (state: WalletsState) => state.entriesFilter
);
