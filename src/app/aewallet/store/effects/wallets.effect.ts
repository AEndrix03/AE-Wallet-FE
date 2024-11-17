import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WalletAction } from '../actions/wallets.action';
import { WalletService } from '../../services/wallet.service';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Router } from '@angular/router';
import { WalletsState } from '../models/wallet.model';
import { select, Store } from '@ngrx/store';

@Injectable()
export class WalletEffects {
  constructor(
    private actions$: Actions,
    private walletService: WalletService,
    private router: Router,
    private store: Store<WalletsState>
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
      tap(() => this.router.navigate(['/wallets/edit']))
    )
  );

  editWalletAndGetEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.editWallet),
      map(({ walletId }) => WalletAction.loadWalletEntries({ walletId }))
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

  loadWalletEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.loadWalletEntries),
      switchMap(({ walletId }) =>
        this.walletService.getWalletEntries(walletId)
      ),
      filter((entries) => !!entries),
      map((entries) => WalletAction.loadedWalletEntries({ entries }))
    )
  );

  reloadWalletEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.reloadWalletEntries),
      switchMap(() =>
        this.store.select((state: any) => state.wallets.selectedWallet)
      ),
      map((selectedWallet) => selectedWallet?.id),
      filter((walletId) => !!walletId),
      map((walletId) => WalletAction.loadWalletEntries({ walletId }))
    )
  );

  loadBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.loadWalletEntries),
      switchMap(({ walletId }) =>
        this.walletService.getWalletBalance(walletId)
      ),
      filter((balance) => balance !== null && balance !== undefined),
      map((balance) => WalletAction.loadedBalance({ balance }))
    )
  );

  saveWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.saveWallet),
      withLatestFrom(
        this.store.pipe(select((state: any) => state.wallets.patchedWallet))
      ),
      filter(([_, wallet]) => !!wallet),
      switchMap(([_, wallet]) => this.walletService.updateWallet(wallet)),
      filter((wallet) => !!wallet),
      map(() => WalletAction.loadAllWallets())
    )
  );

  filterEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletAction.filterEntries),
      switchMap(({ filter }) => this.walletService.getFilteredEntries(filter)),
      map((entries) => WalletAction.filteredEntries({ entries }))
    )
  );
}
