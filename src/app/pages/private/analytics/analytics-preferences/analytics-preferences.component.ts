import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartComponent,
  ChartConfig,
} from '../../../../core/components/chart/chart.component';
import { ChartData } from 'chart.js';
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
  public readonly data: InputSignal<AllocationData[]> = input.required();
  public readonly preferences: InputSignal<PreferencesData[]> =
    input.required();

  protected readonly actualChartData: Signal<ChartData> = computed(() => {
    const data = this.data() || [];
    return {
      labels: data.map((d) => d.name),
      datasets: [
        {
          data: data.map((d) => d.percentage),
          backgroundColor: data.map((d) => d.color),
          borderColor: data.map((d) => d.color),
          borderWidth: 2,
        },
      ],
    };
  });

  protected readonly desiredChartData: Signal<ChartData> = computed(() => {
    const preferences = this.preferences() || [];
    return {
      labels: preferences.map((p) => p.name),
      datasets: [
        {
          data: preferences.map((p) => p.targetPercentage),
          backgroundColor: preferences.map((p) => p.color),
          borderColor: preferences.map((p) => p.color),
          borderWidth: 2,
        },
      ],
    };
  });

  protected readonly actualChartConfig: ChartConfig = {
    type: 'doughnut',
    title: 'Current Allocation',
    height: '20rem',
    showTitle: true,
    dataType: 'percentage',
  };

  protected readonly desiredChartConfig: ChartConfig = {
    type: 'doughnut',
    title: 'Desired Allocation',
    height: '20rem',
    showTitle: true,
    dataType: 'percentage',
  };
}
