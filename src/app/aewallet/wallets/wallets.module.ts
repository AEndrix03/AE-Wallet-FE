import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WalletsComponent } from './wallets.component';
import { WalletDetailComponent } from './wallet-detail/wallet-detail.component';

const routes: Routes = [
  {
    path: '',
    component: WalletsComponent,
  },
  { path: 'edit', component: WalletDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsModule {}
