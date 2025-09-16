import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'wlt-portfolio-new-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './portfolio-new-card.component.html',
})
export class PortfolioNewCardComponent {
  public readonly onCreate = output<void>();
}
