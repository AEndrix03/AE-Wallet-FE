import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { MessageModule } from 'primeng/message';
import {
  FinancialInsight,
  FinancialSummaryData,
} from '../../../../core/models/transaction.models';

@Component({
  selector: 'wlt-analytics-summary',
  standalone: true,
  imports: [CommonModule, BadgeModule, MessageModule],
  templateUrl: './analytics-summary.component.html',
})
export class AnalyticsSummaryComponent {
  public readonly data: InputSignal<FinancialSummaryData> = input.required();

  protected readonly insights: Signal<FinancialInsight[]> = computed(() => {
    const data = this.data();
    if (!data) return [];

    const insights: FinancialInsight[] = [];

    // Savings Rate Insights
    if (data.savingsRate >= 20) {
      insights.push({
        type: 'success',
        title: 'Excellent Savings Rate',
        message: `Your ${data.savingsRate.toFixed(
          1
        )}% savings rate is outstanding! Keep up the great work.`,
        icon: 'pi pi-check-circle',
        actionable: false,
      });
    } else if (data.savingsRate >= 10) {
      insights.push({
        type: 'info',
        title: 'Good Savings Habit',
        message: `Your ${data.savingsRate.toFixed(
          1
        )}% savings rate is solid. Consider increasing it to 20% for optimal financial health.`,
        icon: 'pi pi-info-circle',
        actionable: true,
      });
    } else {
      insights.push({
        type: 'warn',
        title: 'Low Savings Rate',
        message: `Your ${data.savingsRate.toFixed(
          1
        )}% savings rate needs improvement. Aim for at least 10-15% of income.`,
        icon: 'pi pi-exclamation-triangle',
        actionable: true,
      });
    }

    // Cash Flow Insights
    if (data.netFlow < 0) {
      insights.push({
        type: 'error',
        title: 'Negative Cash Flow',
        message:
          "You're spending more than you earn this month. Review your expenses immediately.",
        icon: 'pi pi-times-circle',
        actionable: true,
      });
    }

    // Expense Change Insights
    if (data.expenseChange > 15) {
      insights.push({
        type: 'warn',
        title: 'Spending Spike',
        message: `Expenses increased by ${data.expenseChange.toFixed(
          1
        )}% this month. Identify what caused this increase.`,
        icon: 'pi pi-arrow-up',
        actionable: true,
      });
    } else if (data.expenseChange < -10) {
      insights.push({
        type: 'success',
        title: 'Spending Reduction',
        message: `Great job! Expenses decreased by ${Math.abs(
          data.expenseChange
        ).toFixed(1)}% this month.`,
        icon: 'pi pi-arrow-down',
        actionable: false,
      });
    }

    // Income Change Insights
    if (data.incomeChange > 10) {
      insights.push({
        type: 'success',
        title: 'Income Boost',
        message: `Income increased by ${data.incomeChange.toFixed(
          1
        )}%! Consider allocating extra funds to savings or investments.`,
        icon: 'pi pi-trending-up',
        actionable: true,
      });
    }

    return insights;
  });

  protected readonly kpis = computed(() => {
    const data = this.data();
    if (!data) return [];

    return [
      {
        label: 'Current Balance',
        value: data.currentBalance,
        format: 'currency',
        icon: 'pi pi-wallet',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
      },
      {
        label: 'Monthly Income',
        value: data.monthlyIncome,
        format: 'currency',
        icon: 'pi pi-arrow-up',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        change: data.incomeChange,
      },
      {
        label: 'Monthly Expenses',
        value: data.monthlyExpenses,
        format: 'currency',
        icon: 'pi pi-arrow-down',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        change: data.expenseChange,
      },
      {
        label: 'Net Flow',
        value: data.netFlow,
        format: 'currency',
        icon: data.netFlow >= 0 ? 'pi pi-plus' : 'pi pi-minus',
        color: data.netFlow >= 0 ? 'text-green-600' : 'text-red-600',
        bgColor: data.netFlow >= 0 ? 'bg-green-100' : 'bg-red-100',
      },
      {
        label: 'Savings Rate',
        value: data.savingsRate,
        format: 'percentage',
        icon: 'pi pi-chart-pie',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
      },
    ];
  });

  protected formatValue(value: number, format: string): string {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return value.toString();
    }
  }

  protected getChangeIcon(change: number): string {
    if (change > 0) return 'pi pi-arrow-up';
    if (change < 0) return 'pi pi-arrow-down';
    return 'pi pi-minus';
  }

  protected getChangeClass(change: number): string {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  }

  protected getSeverityBgClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900';
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'warn':
        return 'bg-yellow-100 dark:bg-yellow-900';
      case 'error':
        return 'bg-red-100 dark:bg-red-900';
      default:
        return 'bg-gray-100 dark:bg-gray-700';
    }
  }

  protected getSeverityTextClass(type: string): string {
    switch (type) {
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      case 'warn':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }

  protected readonly Math = Math;
}
