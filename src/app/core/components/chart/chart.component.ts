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
  // Nuove opzioni per customizzare il comportamento
  dataType?: 'currency' | 'percentage' | 'number';
  currency?: string;
  locale?: string;
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

  // Palette colori moderna per Nora design system
  private readonly MODERN_COLORS = {
    // Colori primari (neutri sofisticati)
    primary: '#334155', // slate-700
    secondary: '#475569', // slate-600
    accent: '#64748b', // slate-500
    muted: '#94a3b8', // slate-400

    // Portfolio colors (più sofisticati)
    portfolio: {
      emergency: '#dc2626', // red-600 (più scuro)
      investment: '#059669', // emerald-600 (più sofisticato del verde)
      daily: '#2563eb', // blue-600 (meno saturo)
      discretionary: '#7c3aed', // violet-600 (più elegante del purple)
    },

    // Categorie con gradazioni del tema principale
    category: {
      primary: '#1e293b', // slate-800
      secondary: '#334155', // slate-700
      tertiary: '#475569', // slate-600
      quaternary: '#64748b', // slate-500
      quinary: '#94a3b8', // slate-400
      senary: '#cbd5e1', // slate-300
    },
  };

  get mergedOptions() {
    const defaultOptions = this.getDefaultOptions();
    return { ...defaultOptions, ...this.config.options };
  }

  private formatValue(value: number): string {
    const dataType = this.config.dataType || 'number';
    const currency = this.config.currency || 'EUR';
    const locale = this.config.locale || 'it-IT';

    switch (dataType) {
      case 'currency':
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(value);

      case 'percentage':
        const sign = value >= 0 ? '+' : '';
        return `${sign}${value.toFixed(2)}%`;

      default:
        return new Intl.NumberFormat(locale).format(value);
    }
  }

  private getDefaultOptions() {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 12,
              family: 'Inter, system-ui, sans-serif',
            },
            color: '#475569', // slate-600 per testi
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(15, 23, 42, 0.9)', // slate-900 con opacity
          titleColor: '#f1f5f9', // slate-100
          bodyColor: '#e2e8f0', // slate-200
          borderColor: '#475569', // slate-600
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
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
                  return `${context.dataset.label}: ${this.formatValue(value)}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: this.getYAxisLabel(),
                color: '#64748b', // slate-500
                font: {
                  size: 13,
                  weight: '500',
                  family: 'Inter, system-ui, sans-serif',
                },
              },
              grid: {
                color: 'rgba(148, 163, 184, 0.2)', // slate-400 molto trasparente
                drawBorder: false,
              },
              ticks: {
                color: '#94a3b8', // slate-400
                font: {
                  size: 11,
                  family: 'Inter, system-ui, sans-serif',
                },
                callback: (value: any) => this.formatValue(value),
              },
            },
            x: {
              title: {
                display: true,
                text: 'Time Period',
                color: '#64748b', // slate-500
                font: {
                  size: 13,
                  weight: '500',
                  family: 'Inter, system-ui, sans-serif',
                },
              },
              grid: {
                display: false,
              },
              ticks: {
                color: '#94a3b8', // slate-400
                font: {
                  size: 11,
                  family: 'Inter, system-ui, sans-serif',
                },
              },
            },
          },
          elements: {
            line: {
              borderWidth: 2.5,
            },
            point: {
              radius: 3,
              hoverRadius: 6,
              borderWidth: 2,
              backgroundColor: '#ffffff',
            },
          },
        };

      case 'bar':
        return {
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            tooltip: {
              ...baseOptions.plugins.tooltip,
              callbacks: {
                label: (context: any) => {
                  const value = context.parsed.y;
                  return `${context.dataset.label}: ${this.formatValue(value)}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: this.getYAxisLabel(),
                color: '#64748b',
                font: {
                  size: 13,
                  weight: '500',
                  family: 'Inter, system-ui, sans-serif',
                },
              },
              grid: {
                color: 'rgba(148, 163, 184, 0.2)',
                drawBorder: false,
              },
              ticks: {
                color: '#94a3b8',
                font: {
                  size: 11,
                  family: 'Inter, system-ui, sans-serif',
                },
                callback: (value: any) => this.formatValue(value),
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#94a3b8',
                font: {
                  size: 11,
                  family: 'Inter, system-ui, sans-serif',
                },
              },
            },
          },
          elements: {
            bar: {
              borderRadius: 4,
              borderSkipped: false,
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
              ...baseOptions.plugins.tooltip,
              callbacks: {
                label: (context: any) => {
                  const value = context.parsed;
                  const total = context.dataset.data.reduce(
                    (a: number, b: number) => a + b,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(1);
                  const formattedValue =
                    this.config.dataType === 'currency'
                      ? this.formatValue(value)
                      : `${percentage}%`;
                  return `${context.label}: ${formattedValue}`;
                },
              },
            },
          },
          elements: {
            arc: {
              borderWidth: 2,
              borderColor: '#1e293b', // slate-800 per separare le sezioni
            },
          },
        };

      default:
        return baseOptions;
    }
  }

  private getYAxisLabel(): string {
    const dataType = this.config.dataType || 'number';
    switch (dataType) {
      case 'currency':
        return `Amount (${this.config.currency || 'EUR'})`;
      case 'percentage':
        return 'Deviation from Target (%)';
      default:
        return 'Value';
    }
  }

  // Metodo pubblico per ottenere i colori del tema
  getThemeColors() {
    return this.MODERN_COLORS;
  }
}
