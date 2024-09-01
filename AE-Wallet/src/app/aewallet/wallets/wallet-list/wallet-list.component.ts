import { Component, Input } from '@angular/core';
import { WalletDto } from '../../store/models/wallet.model';
import { WalletCardComponent } from '../wallet-card/wallet-card.component';
import { NgFor } from '@angular/common';
import { MaterialModule } from '../../../shared/modules/material.module';

@Component({
  selector: 'app-wallet-list',
  standalone: true,
  imports: [WalletCardComponent, NgFor, MaterialModule],
  templateUrl: './wallet-list.component.html',
  styleUrl: './wallet-list.component.scss',
})
export class WalletListComponent {
  @Input() wallets: WalletDto[] | null = [];

  createWallet() {}
}
