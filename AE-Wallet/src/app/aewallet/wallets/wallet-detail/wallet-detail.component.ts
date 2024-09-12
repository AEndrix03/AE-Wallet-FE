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
  patchedWallet$: Observable<WalletDto> = of(null);
  isLoading$: Observable<boolean> = of(false);
  walletEntries$: Observable<EntryDto[]> = of([]);

  constructor(private walletFacade: WalletFacadeService) {
    this.patchedWallet$ = this.walletFacade.selectPatchedWallet$;
    this.isLoading$ = this.walletFacade.selectIsLoading$;
    this.walletEntries$ = this.walletFacade.selectPatchedEntries$;
  }
}
