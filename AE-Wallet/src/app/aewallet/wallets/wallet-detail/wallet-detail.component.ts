import { Component } from '@angular/core';
import { WalletInfoComponent } from './wallet-info/wallet-info.component';
import { WalletFacadeService } from '../../store/wallets-facade.service';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { EntryDto, WalletDto } from '../../store/models/wallet.model';
import { AsyncPipe } from '@angular/common';
import { WalletEntryTableComponent } from '../wallet-entry-table/wallet-entry-table.component';
import { AlertService } from '../../../shared/services/alert.service';
import { EntryDetailComponent } from '../entry-detail/entry-detail.component';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-wallet-detail',
  standalone: true,
  imports: [WalletInfoComponent, AsyncPipe, WalletEntryTableComponent],
  templateUrl: './wallet-detail.component.html',
  styleUrl: './wallet-detail.component.scss',
})
export class WalletDetailComponent {
  walletId$: Observable<number> = of(null);
  patchedWallet$: Observable<WalletDto> = of(null);
  isLoading$: Observable<boolean> = of(false);
  walletEntries$: Observable<EntryDto[]> = of([]);

  constructor(
    private walletFacade: WalletFacadeService,
    private alert: AlertService,
    private walletService: WalletService
  ) {
    this.patchedWallet$ = this.walletFacade.selectPatchedWallet$;
    this.isLoading$ = this.walletFacade.selectIsLoading$;
    this.walletEntries$ = this.walletFacade.selectPatchedEntries$;
    this.walletId$ = this.walletFacade.selectWalletId$;
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
}
