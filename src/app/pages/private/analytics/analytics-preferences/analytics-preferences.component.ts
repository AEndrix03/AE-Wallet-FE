import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartComponent,
  ChartConfig,
} from '../../../../core/components/chart/chart.component';
import {
  AllocationData,
  PreferencesData,
} from '../../../../core/models/analytics.models';

@Component({
  selector: 'wlt-analytics-preferences',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './analytics-preferences.component.html',
})
export class AnalyticsPreferencesComponent {
  public readonly data = input.required<AllocationData[]>();
  public readonly preferences = input.required<PreferencesData[]>();

  protected readonly actualChartData = computed(() => {
    const data = this.data() || [];
    return {
      labels: data.map((d) => d.name),
      datasets: [
        {
          data: data.map((d) => d.percentage),
          backgroundColor: data.map((d) => d.color),
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverBorderWidth: 4,
        },
      ],
    };
  });

  protected readonly desiredChartData = computed(() => {
    const preferences = this.preferences() || [];
    return {
      labels: preferences.map((p) => p.name),
      datasets: [
        {
          data: preferences.map((p) => p.targetPercentage),
          backgroundColor: preferences.map((p) => p.color + '80'), // Semi-transparent
          borderColor: preferences.map((p) => p.color),
          borderWidth: 2,
          borderDash: [5, 5],
          hoverBorderWidth: 3,
        },
      ],
    };
  });

  protected readonly allocationComparison = computed(() => {
    const current = this.data() || [];
    const targets = this.preferences() || [];

    return current.map((curr) => {
      const target = targets.find((t) => t.portfolioId === curr.portfolioId);
      return {
        name: curr.name,
        color: curr.color,
        actual: curr.percentage,
        target: target?.targetPercentage || 0,
        deviation: curr.percentage - (target?.targetPercentage || 0),
      };
    });
  });

  protected readonly actualChartConfig: ChartConfig = {
    type: 'doughnut',
    title: '',
    height: '16rem',
    showTitle: false,
    dataType: 'percentage',
    options: {
      cutout: '60%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              return `${context.label}: ${context.parsed.toFixed(1)}%`;
            },
          },
        },
      },
    },
  };

  protected readonly desiredChartConfig: ChartConfig = {
    type: 'doughnut',
    title: '',
    height: '16rem',
    showTitle: false,
    dataType: 'percentage',
    options: {
      cutout: '60%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              return `Target: ${context.parsed.toFixed(1)}%`;
            },
          },
        },
      },
    },
  };

  protected getTotalAmount(): number {
    const data = this.data() || [];
    return data.reduce((sum, item) => sum + item.amount, 0);
  }

  protected formatCurrency(amount: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  protected getOverallHealth(): string {
    const comparison = this.allocationComparison();
    const avgDeviation =
      comparison.reduce((sum, item) => sum + Math.abs(item.deviation), 0) /
      comparison.length;

    if (avgDeviation < 2) return 'Excellent';
    if (avgDeviation < 5) return 'Good';
    if (avgDeviation < 10) return 'Fair';
    return 'Needs Attention';
  }

  protected getHealthIndicatorColor(): string {
    const health = this.getOverallHealth();
    switch (health) {
      case 'Excellent':
        return 'bg-emerald-500';
      case 'Good':
        return 'bg-green-400';
      case 'Fair':
        return 'bg-amber-500';
      default:
        return 'bg-red-500';
    }
  }

  protected getDeviationClass(deviation: number): string {
    if (Math.abs(deviation) < 1)
      return 'text-emerald-600 dark:text-emerald-400 font-medium';
    if (Math.abs(deviation) < 3)
      return 'text-amber-600 dark:text-amber-400 font-medium';
    return 'text-red-600 dark:text-red-400 font-medium';
  }
}
