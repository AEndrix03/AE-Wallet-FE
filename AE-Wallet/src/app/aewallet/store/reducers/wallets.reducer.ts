import { Action, createReducer, on } from '@ngrx/store';
import { WalletsState } from '../models/wallet.model';
import { WalletAction } from '../actions/wallets.action';

export const initialState: WalletsState = {
  allWallets: [],
  selectedWallet: null,
  patchedWallet: null,
  loading: false,
  selectedEntries: [],
  patchedEntries: [],
};

export const walletsFeatureKey = 'wallets';

const _walletsReducer = createReducer(
  initialState,
  on(WalletAction.loadAllWallets, (state) => ({
    ...state,
    loading: true,
  })),
  on(WalletAction.loadedAllWallets, (state, { wallets }) => ({
    ...state,
    loading: false,
    allWallets: [...wallets],
  })),
  on(WalletAction.editWallet, (state) => ({
    ...state,
    loading: true,
  })),
  on(WalletAction.editedWallet, (state, { wallet }) => ({
    ...state,
    loading: false,
    selectedWallet: { ...wallet },
    patchedWallet: { ...wallet },
  })),
  on(WalletAction.createWallet, (state) => ({
    ...state,
    loading: true,
  })),
  on(WalletAction.deleteWallet, (state) => ({
    ...state,
    loading: true,
  })),
  on(WalletAction.loadWalletEntries, (state) => ({
    ...state,
    loading: true,
  })),
  on(WalletAction.loadedWalletEntries, (state, { entries }) => ({
    ...state,
    loading: false,
    selectedEntries: [...entries],
    patchedEntries: [...entries],
  }))
);

export function walletReducer(state: WalletsState | undefined, action: Action) {
  return _walletsReducer(state, action);
}
