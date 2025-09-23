import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { PortfolioDeviationData } from '../../../../core/models/analytics.models';
import {
  ChartComponent,
  ChartConfig,
} from '../../../../core/components/chart/chart.component';
import { ChartData } from 'chart.js';

@Component({
  selector: 'wlt-analytics-general-portfolios',
  standalone: true,
  imports: [CommonModule, ChartModule, ChartComponent],
  templateUrl: './analytics-general-portfolios.component.html',
})
export class AnalyticsGeneralPortfoliosComponent {
  public readonly data: InputSignal<PortfolioDeviationData[]> =
    input.required();

  protected readonly chartData: Signal<ChartData> = computed(() => {
    const data = this.data() || [];
    const labels = data[0].monthlyData.map((d) =>
      new Date(d.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    );

    const datasets = data.map((portfolio) => ({
      label: portfolio.name,
      data: portfolio.monthlyData.map((d) => d.deviationPercentage),
      borderColor: portfolio.color,
      backgroundColor: portfolio.color + '20',
      fill: false,
      tension: 0.2,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 3,
    }));

    return { labels, datasets };
  });

  protected readonly chartConfig: ChartConfig = {
    type: 'line',
    title: 'Portfolio Allocation Performance',
    height: '27rem',
    showTitle: true,
    dataType: 'percentage',
  };
}
