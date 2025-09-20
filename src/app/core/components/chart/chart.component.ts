import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

export interface ChartConfig {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'scatter';
  height?: string;
  options?: any;
  showTitle?: boolean;
  titleIcon?: string;
  titleClass?: string;
}

@Component({
  selector: 'wlt-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <article class="flex flex-col gap-4 h-full">
      @if (config.showTitle !== false) {
      <h2
        [class]="
          config.titleClass ||
          'pl-4 m-0 text-xl font-bold text-gray-900 dark:text-gray-100 mb-6'
        "
      >
        @if (config.titleIcon) {
        <i [class]="config.titleIcon + ' mr-2'"></i>
        }
        {{ config.title }}
      </h2>
      }

      <div class="flex-1">
        <p-chart
          [type]="config.type"
          [data]="data"
          [options]="mergedOptions"
          [height]="config.height"
        >
        </p-chart>
      </div>
    </article>
  `,
})
export class ChartComponent<T> {
  @Input({ required: true }) config!: ChartConfig;
  @Input({ required: true }) data!: T;

  get mergedOptions() {
    const defaultOptions = this.getDefaultOptions();
    return { ...defaultOptions, ...this.config.options };
  }

  private getDefaultOptions() {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
    };

    // Type-specific options
    switch (this.config.type) {
      case 'line':
        return {
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            tooltip: {
              ...baseOptions.plugins.tooltip,
              callbacks: {
                label: (context: any) => {
                  const value = context.parsed.y;
                  const sign = value >= 0 ? '+' : '';
                  return `${context.dataset.label}: ${sign}${value.toFixed(
                    2
                  )}%`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Deviation from Target (%)',
              },
              grid: {
                color: 'rgba(0,0,0,0.1)',
              },
              ticks: {
                callback: function (value: any) {
                  return value >= 0 ? `+${value}%` : `${value}%`;
                },
              },
            },
            x: {
              title: {
                display: true,
                text: 'Time Period',
              },
              grid: {
                display: false,
              },
            },
          },
        };

      case 'bar':
        return {
          ...baseOptions,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0,0,0,0.1)',
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        };

      case 'pie':
      case 'doughnut':
        return {
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const value = context.parsed;
                  const total = context.dataset.data.reduce(
                    (a: number, b: number) => a + b,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${context.label}: ${percentage}%`;
                },
              },
            },
          },
        };

      default:
        return baseOptions;
    }
  }
}
