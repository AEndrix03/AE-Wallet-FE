import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'wlt-portfolio-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './portfolio-card.component.html',
})
export class PortfolioCardComponent {}
