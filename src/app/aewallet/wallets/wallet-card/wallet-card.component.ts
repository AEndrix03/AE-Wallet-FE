import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { WalletDto } from '../../store/models/wallet.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-wallet-card',
  standalone: true,
  imports: [MaterialModule, NgStyle],
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.scss',
})
export class WalletCardComponent {
  @Input() wallet: WalletDto | null = null;

  @Output() openWallet = new EventEmitter<number>();
  @Output() deleteWallet = new EventEmitter<number>();

  open(id: number) {
    this.openWallet.emit(id);
  }

  delete(id: number) {
    this.deleteWallet.emit(id);
  }
}
