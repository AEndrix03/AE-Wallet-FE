import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutPrivateComponent } from '../../layout/private/layout-private.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { BudgetComponent } from './budget/budget.component';
import { SettingsComponent } from './settings/settings.component';
import { AlertsComponent } from './alerts/alerts.component';

export const privateRoutes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'portfolios',
        loadChildren: () =>
          import('./portfolios/portfolios.routes').then((m) => m.routes),
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
      },
      {
        path: 'budget',
        component: BudgetComponent,
      },
      {
        path: 'alerts',
        component: AlertsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];
