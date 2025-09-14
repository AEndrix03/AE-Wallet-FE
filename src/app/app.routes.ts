import { Route } from '@angular/router';
import { authGuard } from '@aredegalli/ng-auth';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/public/public.routes').then((m) => m.publicRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/private/private.routes').then((m) => m.privateRoutes),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('@aredegalli/ng-auth').then((lib) => lib.authRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];