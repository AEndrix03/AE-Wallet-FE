import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartComponent,
  ChartConfig,
} from '../../../../core/components/chart/chart.component';
import { ChartData } from 'chart.js';
import { CategorySpendingData } from '../../../../core/models/transaction.models';

@Component({
  selector: 'wlt-analytics-category',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './analytics-category.component.html',
})
export class AnalyticsCategoryComponent {
  public readonly data: InputSignal<CategorySpendingData[]> = input.required();

  protected readonly chartData: Signal<ChartData> = computed(() => {
    const data = this.data() || [];
    const sortedData = data.sort((a, b) => b.amount - a.amount);

    return {
      labels: sortedData.map((d) => d.category),
      datasets: [
        {
          label: 'Spending Amount',
          data: sortedData.map((d) => d.amount),
          backgroundColor: sortedData.map((d) => d.color),
          borderColor: sortedData.map((d) => d.color),
          borderWidth: 2,
        },
      ],
    };
  });

  protected readonly chartConfig: ChartConfig = {
    type: 'bar',
    title: 'Spending by Category',
    height: '17.5rem',
    showTitle: true,
    dataType: 'currency',
    currency: 'EUR',
    locale: 'it-IT',
  };
}
