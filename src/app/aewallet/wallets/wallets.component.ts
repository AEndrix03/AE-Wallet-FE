import { Component, OnInit } from '@angular/core';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { EntryDto, WalletDto } from '../store/models/wallet.model';
import { filter, Observable, of, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { WalletFacadeService } from '../store/wallets-facade.service';
import { AlertService } from '../../shared/services/alert.service';
import { WalletCreateModalComponent } from './wallet-create-modal/wallet-create-modal.component';
import { AllTimeEntriesComponent } from './all-time-entries/all-time-entries.component';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [WalletListComponent, AsyncPipe, AllTimeEntriesComponent],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss',
})
export class WalletsComponent implements OnInit {
  selectedWallets$: Observable<WalletDto[]> = of([]);
  isLoading$: Observable<boolean> = of(false);
  allTimeEntries$: Observable<EntryDto[]> = of([]);

  constructor(
    private walletFacade: WalletFacadeService,
    private alert: AlertService,
    private walletService: WalletService
  ) {
    this.selectedWallets$ = this.walletFacade.selectAllWallets$;
    this.isLoading$ = this.walletFacade.selectIsLoading$;
    this.allTimeEntries$ = this.walletService.getAllTimeEntries();
  }

  ngOnInit(): void {
    this.walletFacade.dispatchLoadAllWallets();
  }

  openWallet(walletId: number) {
    this.walletFacade.dispatchEditWallet(walletId);
  }

  deleteWallet(walletId: number) {
    this.alert
      .openConfirmDialog({
        message: 'Are you sure you want to delete this wallet?',
      })
      .pipe(
        take(1),
        tap(() => this.walletFacade.dispatchDeleteWallet(walletId))
      )
      .subscribe();
  }

  createWallet() {
    this.alert
      .openComponent$(WalletCreateModalComponent, {})
      .afterClosed()
      .pipe(
        take(1),
        filter((result) => !!result),
        tap((result) => this.walletFacade.dispatchCreateWallet(result))
      )
      .subscribe();
  }

  refreshAllTimeEntries() {
    this.allTimeEntries$ = this.walletService.getAllTimeEntries();
  }

  filterAllTimeEntries(filter: any) {
    // this.allTimeEntries$ = this.walletService.getAllTimeEntries(filter);
  }
}
