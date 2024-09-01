import { Component } from '@angular/core';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletDto } from '../store/models/wallet.model';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [WalletListComponent, AsyncPipe],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss',
})
export class WalletsComponent {
  selectedWallets$: Observable<WalletDto[]> = of([
    {
      id: 1,
      name: 'Wallet 1',
      headerColor: 'white',
      description: 'This is wallet 1',
      headerBackgroundColor: 'red',
    },
    {
      id: 2,
      name: 'Wallet 2',
      headerColor: 'white',
      description: 'This is wallet 2',
      headerBackgroundColor: 'blue',
    },
  ]);
}
