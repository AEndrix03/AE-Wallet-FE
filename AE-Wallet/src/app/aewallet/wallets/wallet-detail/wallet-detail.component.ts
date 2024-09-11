import { Component } from '@angular/core';
import { WalletInfoComponent } from './wallet-info/wallet-info.component';
import { WalletFacadeService } from '../../store/wallets-facade.service';
import { Observable, of } from 'rxjs';
import { EntryDto, WalletDto } from '../../store/models/wallet.model';
import { AsyncPipe } from '@angular/common';
import { WalletEntryTableComponent } from '../wallet-entry-table/wallet-entry-table.component';

@Component({
  selector: 'app-wallet-detail',
  standalone: true,
  imports: [WalletInfoComponent, AsyncPipe, WalletEntryTableComponent],
  templateUrl: './wallet-detail.component.html',
  styleUrl: './wallet-detail.component.scss',
})
export class WalletDetailComponent {
  selectedWallet$: Observable<WalletDto> = of(null);
  patchedWallet$: Observable<WalletDto> = of(null);
  isLoading$: Observable<boolean> = of(false);
  walletEntries$: Observable<EntryDto[]> = of([
    {
      id: 0,
      title: 'Test',
      description: 'Test',
      value: 50.56,
      date: new Date(),
      id_wallet: 0,
    },
    {
      id: 1,
      title: 'Test 2',
      description: 'Test 2',
      value: 100,
      date: new Date(),
      id_wallet: 0,
    },
  ]);

  constructor(private walletFacade: WalletFacadeService) {
    this.selectedWallet$ = this.walletFacade.selectSelectedWallet$;
    this.patchedWallet$ = this.walletFacade.selectPatchedWallet$;
    this.isLoading$ = this.walletFacade.selectIsLoading$;
  }
}
