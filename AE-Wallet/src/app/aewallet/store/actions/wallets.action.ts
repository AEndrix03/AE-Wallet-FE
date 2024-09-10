import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WalletCreateDto, WalletDto } from '../models/wallet.model';

export const WalletAction = createActionGroup({
  source: 'Wallet',
  events: {
    'Load All Wallets': emptyProps(),
    'Loaded All Wallets': props<{ wallets: WalletDto[] }>(),
    'Edit Wallet': props<{ walletId: number }>(),
    'Edited Wallet': props<{ wallet: WalletDto }>(),
    'Create Wallet': props<{ walletCreate: WalletCreateDto }>(),
    'Delete Wallet': props<{ walletId: number }>(),
  },
});
