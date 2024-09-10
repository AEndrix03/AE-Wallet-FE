import { Component, OnInit } from '@angular/core';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletDto } from '../store/models/wallet.model';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { WalletFacadeService } from '../store/wallets-facade.service';

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

  constructor(private walletFacade: WalletFacadeService) {
    this.selectedWallets$ = this.walletFacade.selectAllWallets$;
    this.isLoading$ = this.walletFacade.selectIsLoading$;
  }

  ngOnInit(): void {
    this.walletFacade.dispatchLoadAllWallets();
  }

  openWallet(walletId: number): void {
    this.walletFacade.dispatchEditWallet(walletId);
  }
}
