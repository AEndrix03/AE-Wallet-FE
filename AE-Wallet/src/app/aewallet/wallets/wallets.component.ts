import { Component, OnInit } from '@angular/core';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletDto } from '../store/models/wallet.model';
import { filter, Observable, of, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { WalletFacadeService } from '../store/wallets-facade.service';
import { AlertService } from '../../shared/services/alert.service';
import { WalletCreateModalComponent } from './wallet-create-modal/wallet-create-modal.component';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [WalletListComponent, AsyncPipe],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss',
})
export class WalletsComponent implements OnInit {
  selectedWallets$: Observable<WalletDto[]> = of([]);
  isLoading$: Observable<boolean> = of(false);

  constructor(
    private walletFacade: WalletFacadeService,
    private alert: AlertService
  ) {
    this.selectedWallets$ = this.walletFacade.selectAllWallets$;
    this.isLoading$ = this.walletFacade.selectIsLoading$;
  }

  ngOnInit(): void {
    this.walletFacade.dispatchLoadAllWallets();
  }

  openWallet(walletId: number) {
    this.walletFacade.dispatchEditWallet(walletId);
  }

  createWallet() {
    this.alert
      .openDialog(WalletCreateModalComponent, {})
      .afterClosed()
      .pipe(
        take(1),
        filter((result) => !!result),
        tap((result) => this.walletFacade.dispatchCreateWallet(result))
      )
      .subscribe();
  }
}
