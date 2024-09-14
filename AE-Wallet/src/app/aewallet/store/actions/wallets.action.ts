import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EntryDto, WalletCreateDto, WalletDto } from '../models/wallet.model';

export const WalletAction = createActionGroup({
  source: 'Wallet',
  events: {
    'Load All Wallets': emptyProps(),
    'Loaded All Wallets': props<{ wallets: WalletDto[] }>(),
    'Edit Wallet': props<{ walletId: number }>(),
    'Edited Wallet': props<{ wallet: WalletDto }>(),
    'Create Wallet': props<{ walletCreate: WalletCreateDto }>(),
    'Delete Wallet': props<{ walletId: number }>(),
    'Load Wallet Entries': props<{ walletId: number }>(),
    'Loaded Wallet Entries': props<{ entries: EntryDto[] }>(),
    'Reload Wallet Entries': emptyProps(),
    'Loaded Balance': props<{ balance: number }>(),
    'Update Wallet': props<{ wallet: WalletDto }>(),
    'Save Wallet': emptyProps(),
  },
});
