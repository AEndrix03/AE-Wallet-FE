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
      import('./aewallet/aewallet.module').then((m) => m.AEWalletModule),
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
