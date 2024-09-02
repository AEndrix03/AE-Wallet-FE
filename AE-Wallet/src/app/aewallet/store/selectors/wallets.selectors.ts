import { createFeatureSelector, createSelector } from '@ngrx/store';
import { walletsFeatureKey } from '../reducers/wallets.reducer';
import { WalletsState } from '../models/wallet.model';

export const selectWalletState =
  createFeatureSelector<WalletsState>(walletsFeatureKey);

export const selectAllWallets = createSelector(
  selectWalletState,
  (state: WalletsState) => state.allWallets || []
);
