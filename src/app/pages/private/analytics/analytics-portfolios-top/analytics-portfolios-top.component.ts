import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDeviationData } from '../../../../core/models/analytics.models';

interface RankedPortfolio {
  readonly rank: number;
  readonly name: string;
  readonly color: string;
  readonly avgDeviation: number;
  readonly rating: number;
  readonly trend: string;
}

@Component({
  selector: 'wlt-analytics-portfolios-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-portfolios-top.component.html',
})
export class AnalyticsPortfoliosTopComponent {
  public readonly data = input.required<PortfolioDeviationData[]>();

  protected readonly rankedPortfolios = computed((): RankedPortfolio[] => {
    const data = this.data() || [];
    return data
      .sort((a, b) => a.statistics.rank - b.statistics.rank)
      .map((portfolio) => ({
        rank: portfolio.statistics.rank,
        name: portfolio.name,
        color: portfolio.color,
        avgDeviation: portfolio.statistics.averageDeviation,
        rating: portfolio.statistics.rating,
        trend: portfolio.statistics.trend,
      }));
  });

  protected getRankCardClass(index: number): string {
    const baseClass =
      'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800';

    if (index === 0)
      return `${baseClass} ring-2 ring-amber-200 dark:ring-amber-800 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-neutral-800`;
    if (index === 1)
      return `${baseClass} ring-1 ring-neutral-300 dark:ring-neutral-600 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-700/20 dark:to-neutral-800`;

    return baseClass;
  }

  protected getRankBadgeClass(index: number): string {
    const baseClass =
      'w-6 h-6 rounded-full flex items-center justify-center text-white';

    if (index === 0)
      return `${baseClass} bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg`;
    if (index === 1)
      return `${baseClass} bg-gradient-to-br from-neutral-400 to-neutral-600 shadow-md`;
    if (index === 2)
      return `${baseClass} bg-gradient-to-br from-amber-600 to-amber-800 shadow-md`;

    return `${baseClass} bg-gradient-to-br from-neutral-500 to-neutral-700`;
  }

  protected getGradientClass(index: number): string {
    if (index === 0) return 'from-amber-400 to-amber-600';
    return 'from-neutral-400 to-neutral-600';
  }

  protected getTrendIcon(trend: string): string {
    switch (trend) {
      case 'improving':
        return 'pi pi-arrow-up';
      case 'worsening':
        return 'pi pi-arrow-down';
      default:
        return 'pi pi-minus';
    }
  }

  protected getTrendClass(trend: string): string {
    switch (trend) {
      case 'improving':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'worsening':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-neutral-500 dark:text-neutral-400';
    }
  }

  protected getAverageDeviation(): number {
    const portfolios = this.rankedPortfolios();
    if (portfolios.length === 0) return 0;

    return (
      portfolios.reduce((sum, p) => sum + p.avgDeviation, 0) / portfolios.length
    );
  }

  protected getImprovingCount(): number {
    return this.rankedPortfolios().filter((p) => p.trend === 'improving')
      .length;
  }
}
