import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
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
  dataType?: 'currency' | 'percentage' | 'number';
  currency?: string;
  locale?: string;
}

interface ChartTooltipContext {
  readonly parsed: any;
  readonly dataset: any;
  readonly label: string;
  readonly datasetIndex: number;
}

@Component({
  selector: 'wlt-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <article class="flex flex-col gap-4 h-full">
      @if (config().showTitle !== false) {
      <h2 [class]="titleClass()">
        @if (config().titleIcon) {
        <i [class]="config().titleIcon + ' mr-2'"></i>
        }
        {{ config().title }}
      </h2>
      }

      <div class="flex-1">
        <p-chart
          [type]="config().type"
          [data]="data()"
          [options]="chartOptions()"
          [height]="config().height"
        />
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent<T> {
  // Signal inputs
  public readonly config = input.required<ChartConfig>();
  public readonly data = input.required<T>();

  // Modern color palette
  private static readonly COLORS = {
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    primary: {
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    emerald: {
      500: '#10b981',
      600: '#059669',
    },
    rose: {
      500: '#f43f5e',
      600: '#e11d48',
    },
    amber: {
      500: '#f59e0b',
      600: '#d97706',
    },
    purple: {
      500: '#8b5cf6',
      600: '#7c3aed',
    },
    cyan: {
      500: '#06b6d4',
      600: '#0891b2',
    },
  } as const;

  // Computed signals
  public readonly titleClass = computed(
    () =>
      this.config().titleClass ||
      'pl-4 m-0 text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6'
  );

  private readonly formatter = computed(() => {
    const {
      dataType = 'number',
      currency = 'EUR',
      locale = 'it-IT',
    } = this.config();

    switch (dataType) {
      case 'currency':
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format.bind(
          new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        );

      case 'percentage':
        return (value: number) =>
          `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

      default:
        return new Intl.NumberFormat(locale).format.bind(
          new Intl.NumberFormat(locale)
        );
    }
  });

  private readonly yAxisLabel = computed(() => {
    const { dataType = 'number', currency = 'EUR' } = this.config();
    switch (dataType) {
      case 'currency':
        return `Amount (${currency})`;
      case 'percentage':
        return 'Deviation from Target (%)';
      default:
        return 'Value';
    }
  });

  public readonly chartOptions = computed(() => {
    const cfg = this.config();
    const formatter = this.formatter();
    const yLabel = this.yAxisLabel();

    const baseOptions = this.createBaseOptions(formatter);
    const typeSpecificOptions = this.createTypeOptions(
      cfg.type,
      formatter,
      yLabel
    );

    return cfg.options
      ? { ...baseOptions, ...typeSpecificOptions, ...cfg.options }
      : { ...baseOptions, ...typeSpecificOptions };
  });

  private createBaseOptions(formatter: (value: number) => string) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          onClick: this.createLegendClickHandler(),
          labels: {
            usePointStyle: true,
            padding: 16,
            font: {
              size: 13,
              family: 'Inter, system-ui, sans-serif',
              weight: '500',
            },
            color: ChartComponent.COLORS.neutral[600],
          },
        },
        tooltip: {
          mode: 'index' as const,
          intersect: false,
          backgroundColor: ChartComponent.COLORS.neutral[900] + 'f0',
          titleColor: ChartComponent.COLORS.neutral[50],
          bodyColor: ChartComponent.COLORS.neutral[100],
          borderColor: ChartComponent.COLORS.neutral[700],
          borderWidth: 1,
          cornerRadius: 12,
          padding: 16,
          titleFont: { size: 13, weight: '600' },
          bodyFont: { size: 12 },
          callbacks: {
            label: (context: ChartTooltipContext) => {
              const value = context.parsed.y ?? context.parsed;
              return `${context.dataset.label || context.label}: ${formatter(
                value
              )}`;
            },
          },
        },
      },
    };
  }

  private createTypeOptions(
    type: ChartConfig['type'],
    formatter: (value: number) => string,
    yLabel: string
  ) {
    const scalesConfig = {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yLabel,
          color: ChartComponent.COLORS.neutral[500],
          font: {
            size: 13,
            weight: '600',
            family: 'Inter, system-ui, sans-serif',
          },
        },
        grid: {
          color: ChartComponent.COLORS.neutral[200],
          drawBorder: false,
        },
        ticks: {
          color: ChartComponent.COLORS.neutral[400],
          font: { size: 11, family: 'Inter, system-ui, sans-serif' },
          callback: (value: any) => formatter(value),
        },
      },
      x: {
        title: {
          display: true,
          text: 'Period',
          color: ChartComponent.COLORS.neutral[500],
          font: {
            size: 13,
            weight: '600',
            family: 'Inter, system-ui, sans-serif',
          },
        },
        grid: { display: false },
        ticks: {
          color: ChartComponent.COLORS.neutral[400],
          font: { size: 11, family: 'Inter, system-ui, sans-serif' },
        },
      },
    };

    switch (type) {
      case 'line':
        return {
          scales: scalesConfig,
          elements: {
            line: {
              borderWidth: 3,
              tension: 0.1,
            },
            point: {
              radius: 4,
              hoverRadius: 8,
              borderWidth: 2,
              backgroundColor: ChartComponent.COLORS.neutral[50],
              hoverBorderWidth: 3,
            },
          },
        };

      case 'bar':
        return {
          scales: {
            ...scalesConfig,
            x: { ...scalesConfig.x, title: undefined },
          },
          elements: {
            bar: {
              borderRadius: 6,
              borderSkipped: false,
            },
          },
        };

      case 'pie':
      case 'doughnut':
        return {
          plugins: {
            tooltip: {
              callbacks: {
                label: (context: ChartTooltipContext) => {
                  const value = context.parsed;
                  const total = context.dataset.data.reduce(
                    (a: number, b: number) => a + b,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(1);
                  const formattedValue =
                    this.config().dataType === 'currency'
                      ? formatter(value)
                      : `${percentage}%`;
                  return `${context.label}: ${formattedValue}`;
                },
              },
            },
          },
          elements: {
            arc: {
              borderWidth: 3,
              borderColor: ChartComponent.COLORS.neutral[50],
              hoverBorderWidth: 4,
            },
          },
        };

      case 'radar':
        return {
          scales: {
            r: {
              beginAtZero: true,
              ticks: {
                color: ChartComponent.COLORS.neutral[400],
                font: { size: 11, family: 'Inter, system-ui, sans-serif' },
                callback: (value: any) => formatter(value),
              },
              grid: { color: ChartComponent.COLORS.neutral[200] },
              pointLabels: {
                color: ChartComponent.COLORS.neutral[600],
                font: { size: 12, weight: '500' },
              },
            },
          },
          elements: {
            line: { borderWidth: 3 },
            point: { radius: 4, hoverRadius: 6 },
          },
        };

      case 'scatter':
        return {
          scales: scalesConfig,
          elements: {
            point: {
              radius: 6,
              hoverRadius: 10,
              borderWidth: 2,
              hoverBorderWidth: 3,
            },
          },
        };

      default:
        return {};
    }
  }

  private createLegendClickHandler() {
    return (e: any, legendItem: any, legend: any) => {
      const index = legendItem.datasetIndex;
      const ci = legend.chart;
      const meta = ci.getDatasetMeta(index);
      meta.hidden =
        meta.hidden === null ? !ci.data.datasets[index].hidden : null;
      ci.update();
    };
  }

  public getThemeColors() {
    return ChartComponent.COLORS;
  }
}
