import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WalletAction } from '../actions/wallets.action';
import { WalletService } from '../../services/wallet.service';
import { filter, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class WalletEffects {
  constructor(
    private actions$: Actions,
    private walletService: WalletService,
    private router: Router
  ) {}

  loadAllWallets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.loadAllWallets),
      switchMap(() => this.walletService.getUserWallets()),
      filter((wallets) => !!wallets),
      map((wallets) => WalletAction.loadedAllWallets({ wallets }))
    )
  );

  editWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.editWallet),
      switchMap(({ walletId }) => this.walletService.getWallet(walletId)),
      filter((wlt) => !!wlt),
      map((wallet) => WalletAction.editedWallet({ wallet })),
      tap(() => this.router.navigate(['/wallet/edit']))
    )
  );

  createWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.createWallet),
      switchMap(({ walletCreate }) =>
        this.walletService.createWallet(walletCreate)
      ),
      filter((walletId) => !!walletId),
      map(() => WalletAction.loadAllWallets())
    )
  );

  deleteWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.deleteWallet),
      switchMap(({ walletId }) => this.walletService.deleteWallet(walletId)),
      filter((walletId) => !!walletId),
      map(() => WalletAction.loadAllWallets())
    )
  );
}
