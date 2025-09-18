import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { PortfolioDto } from '../../../../core/models/portfolio.models';
import {
  PORTFOLIO_TYPE_CONFIG,
  PortfolioStatusEnum,
} from '../../../../core/enums/portfolio.enums';
import { CURRENCY_SYMBOLS } from '../../../../core/enums/core.enums';

@Component({
  selector: 'wlt-portfolio-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChipModule,
    ProgressBarModule,
    TooltipModule,
  ],
  templateUrl: './portfolio-card.component.html',
})
export class PortfolioCardComponent {
  public readonly portfolio = input.required<PortfolioDto>();
  public readonly view = output<void>();
  public readonly edit = output<void>();
  public readonly delete = output<void>();

  public readonly typeConfig = computed(
    () => PORTFOLIO_TYPE_CONFIG[this.portfolio().type]
  );

  public readonly currencySymbol = computed(
    () => CURRENCY_SYMBOLS[this.portfolio().currency]
  );

  public readonly percentageOfTotal = computed(() => {
    return this.portfolio().target > 0
      ? (this.portfolio().balance / this.portfolio().target) * 100
      : 0;
  });

  public readonly targetProgress = computed(() => {
    const target = this.portfolio().target;
    const balance = this.portfolio().balance;
    if (!target || target <= 0) return 0;
    return Math.min((balance / target) * 100, 100);
  });

  public readonly status = computed(() => {
    const portfolio = this.portfolio();
    const progress = this.targetProgress();

    if (portfolio.balance <= 0) return PortfolioStatusEnum.CRITICAL;
    if (portfolio.target && progress < 25) return PortfolioStatusEnum.WARNING;
    if (portfolio.target && progress >= 100) return PortfolioStatusEnum.HEALTHY;
    if (!portfolio.target) return PortfolioStatusEnum.HEALTHY;

    return PortfolioStatusEnum.WARNING;
  });

  public readonly statusConfig = computed(() => {
    const status = this.status();
    const configs = {
      [PortfolioStatusEnum.HEALTHY]: {
        severity: 'success' as const,
        label: 'Sano',
        class:
          'text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-800',
      },
      [PortfolioStatusEnum.WARNING]: {
        severity: 'warning' as const,
        label: 'Attenzione',
        class:
          'text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-900/20 dark:border-amber-800',
      },
      [PortfolioStatusEnum.CRITICAL]: {
        severity: 'danger' as const,
        label: 'Critico',
        class:
          'text-red-700 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800',
      },
      [PortfolioStatusEnum.INACTIVE]: {
        severity: 'secondary' as const,
        label: 'Inattivo',
        class:
          'text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-800/20 dark:border-slate-700',
      },
    };
    return configs[status];
  });

  public readonly daysSinceUpdate = computed(() => {
    const lastUpdated = new Date(this.portfolio().lastUpdated);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  });

  public formatCurrency(amount: number): string {
    const symbol = this.currencySymbol();
    return (
      new Intl.NumberFormat('it-IT', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount) +
      ' ' +
      symbol
    );
  }

  public formatPercentage(value: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  }

  protected readonly PortfolioStatusEnum = PortfolioStatusEnum;
}
