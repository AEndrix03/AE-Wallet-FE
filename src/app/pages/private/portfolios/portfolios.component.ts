import { Component } from '@angular/core';
import { PortfolioNewCardComponent } from './portfolio-new-card/portfolio-new-card.component';
import { PortfolioCardComponent } from './portfolio-card/portfolio-card.component';

@Component({
  selector: 'wlt-portfolios',
  imports: [PortfolioNewCardComponent, PortfolioCardComponent],
  templateUrl: './portfolios.component.html',
})
export class PortfoliosComponent {}
