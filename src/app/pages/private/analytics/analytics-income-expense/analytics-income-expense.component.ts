import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartComponent,
  ChartConfig,
} from '../../../../core/components/chart/chart.component';
import { ChartData } from 'chart.js';
import { IncomeExpenseData } from '../../../../core/models/transaction.models';

@Component({
  selector: 'wlt-analytics-income-expense',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './analytics-income-expense.component.html',
})
export class AnalyticsIncomeExpenseComponent {
  public readonly data: InputSignal<IncomeExpenseData[]> = input.required();

  protected readonly chartData: Signal<ChartData> = computed(() => {
    const data = this.data() || [];
    const labels = data.map((d) =>
      new Date(d.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    );

    return {
      labels,
      datasets: [
        {
          label: 'Income',
          data: data.map((d) => d.income),
          borderColor: '#10b981',
          backgroundColor: '#10b981' + '20',
          fill: false,
          tension: 0.2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
        },
        {
          label: 'Expenses',
          data: data.map((d) => d.expense),
          borderColor: '#ef4444',
          backgroundColor: '#ef4444' + '20',
          fill: false,
          tension: 0.2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
        },
        {
          label: 'Net Flow',
          data: data.map((d) => d.netFlow),
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6' + '20',
          fill: false,
          tension: 0.2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
          borderDash: [5, 5],
        },
      ],
    };
  });

  protected readonly chartConfig: ChartConfig = {
    type: 'line',
    title: 'Income vs Expenses Trend',
    height: '14rem',
    showTitle: true,
    dataType: 'currency',
    currency: 'EUR',
    locale: 'it-IT',
  };
}
