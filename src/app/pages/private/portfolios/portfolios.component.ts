import { Component, inject } from '@angular/core';
import { PortfolioNewCardComponent } from './components/portfolio-new-card/portfolio-new-card.component';
import { PortfolioCardComponent } from './components/portfolio-card/portfolio-card.component';
import { PortfolioTypeEnum } from '../../../core/enums/portfolio.enums';
import { PortfolioDto } from '../../../core/models/portfolio.models';
import { Router } from '@angular/router';

@Component({
  selector: 'wlt-portfolios',
  imports: [PortfolioNewCardComponent, PortfolioCardComponent],
  templateUrl: './portfolios.component.html',
})
export class PortfoliosComponent {
  private readonly router: Router = inject(Router);

  public readonly portfolio: PortfolioDto = {
    id: '392',
    name: 'Università',
    type: PortfolioTypeEnum.SAVINGS,
    balance: 1250.75,
    target: 2000.0,
    currency: 'EUR',
    lastUpdated: new Date(),
  };

  protected openDetail(id: string) {
    this.router.navigate([`portfolios/detail`], { queryParams: { id } });
  }
}
