import { Component } from '@angular/core';
import { WalletInfoComponent } from './wallet-info/wallet-info.component';
import { WalletFacadeService } from '../../store/wallets-facade.service';
import { Observable, of } from 'rxjs';
import { WalletDto } from '../../store/models/wallet.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-wallet-detail',
  standalone: true,
  imports: [WalletInfoComponent, AsyncPipe],
  templateUrl: './wallet-detail.component.html',
  styleUrl: './wallet-detail.component.scss',
})
export class WalletDetailComponent {
  selectedWallet$: Observable<WalletDto> = of(null);
  patchedWallet$: Observable<WalletDto> = of(null);
  isLoading$: Observable<boolean> = of(false);

  constructor(private walletFacade: WalletFacadeService) {
    this.selectedWallet$ = this.walletFacade.selectSelectedWallet$;
    this.patchedWallet$ = this.walletFacade.selectPatchedWallet$;
    this.isLoading$ = this.walletFacade.selectIsLoading$;
  }
}
