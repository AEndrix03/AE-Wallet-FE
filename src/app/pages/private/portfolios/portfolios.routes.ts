import { PortfoliosComponent } from './portfolios.component';
import { Routes } from '@angular/router';
import { PortfolioDetailComponent } from './components/portfolio-detail/portfolio-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: PortfoliosComponent,
  },
  {
    path: 'detail',
    component: PortfolioDetailComponent,
  },
];
