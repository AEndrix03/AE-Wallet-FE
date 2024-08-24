import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

const subRoutes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
export class AEWalletModule {}
