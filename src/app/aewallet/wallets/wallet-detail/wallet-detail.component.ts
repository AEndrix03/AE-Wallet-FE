import { Component } from '@angular/core';
import { WalletInfoComponent } from './wallet-info/wallet-info.component';
import { WalletFacadeService } from '../../store/wallets-facade.service';
import { filter, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { EntryDto, WalletDto } from '../../store/models/wallet.model';
import { AsyncPipe } from '@angular/common';
import { WalletEntryTableComponent } from '../wallet-entry-table/wallet-entry-table.component';
import { AlertService } from '../../../shared/services/alert.service';
import { EntryDetailComponent } from '../entry-detail/entry-detail.component';
import { WalletService } from '../../services/wallet.service';
import { LoadingInfoComponent } from '../../../shared/components/utils/loading-info/loading-info.component';
import { WalletFilterModalComponent } from './wallet-filter-modal/wallet-filter-modal.component';
import { WalletAction } from '../../store/actions/wallets.action';

@Component({
  selector: 'app-wallet-detail',
  standalone: true,
  imports: [
    WalletInfoComponent,
    AsyncPipe,
    WalletEntryTableComponent,
    LoadingInfoComponent,
  ],
  templateUrl: './wallet-detail.component.html',
  styleUrl: './wallet-detail.component.scss',
})
export class WalletDetailComponent {
  walletId$: Observable<number> = of(null);
  patchedWallet$: Observable<WalletDto> = of(null);
  isLoading$: Observable<boolean> = of(false);
  walletEntries$: Observable<EntryDto[]> = of([]);
  balance$: Observable<number> = of(0);

  constructor(
    private walletFacade: WalletFacadeService,
    private alert: AlertService,
    private walletService: WalletService
  ) {
    this.patchedWallet$ = this.walletFacade.selectPatchedWallet$;
    this.isLoading$ = this.walletFacade.selectIsLoading$;
    this.walletEntries$ = this.walletFacade.selectFilteredEntries$;
    this.walletId$ = this.walletFacade.selectWalletId$;
    this.balance$ = this.walletFacade.selectBalance$;
  }

  addEntry(walletId: number) {
    this.alert
      .openComponent$(EntryDetailComponent, {
        data: { entryId: null, walletId },
      })
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap((result: EntryDto) => this.walletService.createEntry(result)),
        filter((result) => !!result),
        tap(() => this.walletFacade.dispatchReloadWalletEntries())
      )
      .subscribe();
  }

  editEntry(entryId: number) {
    this.alert
      .openComponent$(EntryDetailComponent, {
        data: { entryId },
      })
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap((result: EntryDto) => this.walletService.updateEntry(result)),
        filter((result) => !!result),
        tap(() => this.walletFacade.dispatchReloadWalletEntries())
      )
      .subscribe();
  }

  deleteEntry(entryId: number) {
    this.alert
      .openConfirmDialog({
        message: 'Are you sure you want to delete this entry?',
      })
      .pipe(
        switchMap(() => this.walletService.deleteEntry(entryId)),
        tap(() => this.walletFacade.dispatchReloadWalletEntries())
      )
      .subscribe();
  }

  refreshEntries() {
    this.walletFacade.dispatchReloadWalletEntries();
  }

  saveWallet() {
    this.walletFacade.dispatchSaveWallet();
  }

  editWallet(wallet: WalletDto) {
    this.walletFacade.dispatchUpdateWallet(wallet);
  }

  filterEntries() {
    this.walletFacade.selectEntriesFilter$
      .pipe(
        take(1),
        switchMap((data) =>
          this.alert
            .openComponent$(WalletFilterModalComponent, { data })
            .afterClosed()
        ),
        map((filter) => {
          if (filter === null) {
            this.walletFacade.dispatchResetFilter();
          } else {
            this.walletFacade.dispatchFilterEntries(filter);
          }
        })
      )
      .subscribe();
  }
}
