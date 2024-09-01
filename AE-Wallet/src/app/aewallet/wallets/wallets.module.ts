import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WalletsComponent } from './wallets.component';

const subRoutes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: WalletsComponent,
    children:
      /*{ path: 'dashboard', component: HomeDashboardComponent },
      { path: 'detail/:id', component: HomeDetailComponent }*/
      subRoutes,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsModule {}
