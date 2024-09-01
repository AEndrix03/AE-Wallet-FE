import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { NotAuthorizedComponent } from './shared/pages/not-authorized/not-authorized.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./aewallet/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'wallets',
    loadChildren: () =>
      import('./aewallet/wallets/wallets.module').then((m) => m.WalletsModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
