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

export const selectPatchedEntries = createSelector(
  selectWalletState,
  (state: WalletsState) => state.patchedEntries || []
);

export const selectWalletId = createSelector(
  selectSelectedWallet,
  (wallet) => wallet?.id
);
