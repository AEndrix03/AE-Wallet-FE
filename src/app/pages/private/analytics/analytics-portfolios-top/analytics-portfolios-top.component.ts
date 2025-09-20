import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { RatingModule } from 'primeng/rating';
import { PortfolioDeviationData } from '../../../../core/models/analytics.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'wlt-analytics-portfolios-top',
  standalone: true,
  imports: [CommonModule, BadgeModule, RatingModule, FormsModule],
  templateUrl: './analytics-portfolios-top.component.html',
})
export class AnalyticsPortfoliosTopComponent {
  public readonly data: InputSignal<PortfolioDeviationData[]> =
    input.required();

  protected readonly rankedPortfolios: Signal<any[]> = computed(() => {
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

  protected getBadgeSeverity(
    index: number
  ): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    if (index === 0) return 'success';
    if (index === 1) return 'info';
    if (index === 2) return 'warn';
    return 'danger';
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
        return 'text-green-500';
      case 'worsening':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }
}
