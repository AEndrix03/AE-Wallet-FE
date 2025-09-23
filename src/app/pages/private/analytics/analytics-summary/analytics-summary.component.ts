import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialSummaryData } from '../../../../core/models/transaction.models';

interface KpiCard {
  readonly label: string;
  readonly value: number;
  readonly format: 'currency' | 'percentage';
  readonly icon: string;
  readonly trend?: number;
  readonly variant: 'primary' | 'success' | 'danger' | 'warning' | 'info';
}

@Component({
  selector: 'wlt-analytics-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-summary.component.html',
})
export class AnalyticsSummaryComponent {
  public readonly data = input.required<FinancialSummaryData>();

  protected readonly kpis = computed((): KpiCard[] => {
    const data = this.data();
    if (!data) return [];

    return [
      {
        label: 'Total Balance',
        value: data.currentBalance,
        format: 'currency',
        icon: 'pi pi-wallet',
        variant: 'primary',
      },
      {
        label: 'Monthly Income',
        value: data.monthlyIncome,
        format: 'currency',
        icon: 'pi pi-arrow-up',
        variant: 'success',
        trend: data.incomeChange,
      },
      {
        label: 'Monthly Expenses',
        value: data.monthlyExpenses,
        format: 'currency',
        icon: 'pi pi-arrow-down',
        variant: 'danger',
        trend: data.expenseChange,
      },
      {
        label: 'Net Flow',
        value: data.netFlow,
        format: 'currency',
        icon: data.netFlow >= 0 ? 'pi pi-trending-up' : 'pi pi-trending-down',
        variant: data.netFlow >= 0 ? 'success' : 'danger',
      },
      {
        label: 'Savings Rate',
        value: data.savingsRate,
        format: 'percentage',
        icon: 'pi pi-chart-pie',
        variant: 'info',
      },
    ];
  });

  protected formatValue(
    value: number,
    format: 'currency' | 'percentage'
  ): string {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: value < 1000 ? 2 : 0,
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
    }
  }

  protected getBackgroundClass(variant: KpiCard['variant']): string {
    const classes = {
      primary: 'from-neutral-800 to-neutral-900 text-white',
      success: 'from-emerald-500 to-emerald-600 text-white',
      danger: 'from-red-500 to-red-600 text-white',
      warning: 'from-amber-500 to-amber-600 text-white',
      info: 'from-blue-500 to-blue-600 text-white',
    };
    return classes[variant];
  }

  protected getIconWrapperClass(variant: KpiCard['variant']): string {
    return 'inline-flex p-2 rounded-lg bg-white/10 backdrop-blur-sm';
  }

  protected getIconClass(variant: KpiCard['variant']): string {
    return 'text-white/90';
  }

  protected getTextClass(variant: KpiCard['variant']): string {
    return 'text-white';
  }

  protected getTrendIcon(trend: number): string {
    return trend >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down';
  }

  protected getTrendClass(trend: number, variant: KpiCard['variant']): string {
    const baseClass = 'text-white/80';
    return baseClass;
  }

  protected readonly Math = Math;
}
