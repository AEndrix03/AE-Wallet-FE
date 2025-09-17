import { Component } from '@angular/core';
import { PortfolioNewCardComponent } from './portfolio-new-card/portfolio-new-card.component';
import { PortfolioCardComponent } from './portfolio-card/portfolio-card.component';
import { PortfolioTypeEnum } from '../../../core/enums/portfolio.enums';
import { PortfolioDto } from '../../../core/models/portfolio.models';

@Component({
  selector: 'wlt-portfolios',
  imports: [PortfolioNewCardComponent, PortfolioCardComponent],
  templateUrl: './portfolios.component.html',
})
export class PortfoliosComponent {
  public readonly portfolio: PortfolioDto = {
    id: '392',
    name: 'Università',
    type: PortfolioTypeEnum.SAVINGS,
    balance: 1250.75,
    target: 2000.0,
    currency: 'EUR',
    lastUpdated: new Date(),
  };
}
