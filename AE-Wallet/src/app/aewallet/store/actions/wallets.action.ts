import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WalletDto } from '../models/wallet.model';

export const WalletAction = createActionGroup({
  source: 'Wallet',
  events: {
    'Load All Wallets': props<{ userId: number }>(),
    'Loaded All Wallets': props<{ wallets: WalletDto[] }>(),
    'Edit Wallet': props<{ walletId: number }>(),
    'Edited Wallet': props<{ wallet: WalletDto }>(),
    'Delete Wallet': props<{ walletId: number }>(),
    'Deleted Wallet': emptyProps(),
    'Create Wallet': emptyProps(),
    'Created Wallet': props<{ wallet: WalletDto }>(),
  },
});
