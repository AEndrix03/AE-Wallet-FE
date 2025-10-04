import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputNumberComponent } from '../../../../core/components/input-number/input-number.component';
import {
  ChartComponent,
  ChartConfig,
} from '../../../../core/components/chart/chart.component';
import { PortfolioDto } from '../../../../core/models/portfolio.models';
import { PreferencesData } from '../../../../core/models/analytics.models';

interface PortfolioPreferenceForm {
  [key: string]: FormControl<number>;
}

@Component({
  selector: 'wlt-preferences-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberComponent,
    ButtonComponent,
    ChartComponent,
  ],
  template: `
    <div class="flex flex-col gap-6 p-6">
      <!-- Instructions Banner -->
      <div
        class="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 dark:from-neutral-700 dark:to-neutral-800 p-6 border border-neutral-700 dark:border-neutral-600"
      >
        <div class="absolute inset-0 opacity-5">
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
          ></div>
        </div>
        <div class="relative flex items-start gap-4">
          <div class="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <i class="pi pi-chart-pie text-emerald-400 text-xl"></i>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-white mb-2">
              Configure Target Allocation
            </h3>
            <p class="text-neutral-300 text-sm leading-relaxed">
              Set your ideal portfolio distribution percentages. Total must
              equal <span class="font-semibold text-emerald-400">100%</span> to
              save your preferences.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form Section -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2 mb-2">
            <div class="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <i
                class="pi pi-sliders-h text-neutral-600 dark:text-neutral-400"
              ></i>
            </div>
            <h4 class="font-semibold text-neutral-900 dark:text-neutral-100">
              Portfolio Targets
            </h4>
          </div>

          <form [formGroup]="form" class="flex flex-col gap-3">
            @for (portfolio of portfolios; track portfolio.id) {
            <div
              class="group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-md transition-all duration-200"
            >
              <div class="flex items-center gap-3 p-4">
                <div class="relative">
                  <div
                    class="w-3 h-3 rounded-full shadow-sm ring-2 ring-white dark:ring-neutral-800"
                    [style.backgroundColor]="portfolio.color"
                  ></div>
                </div>

                <div class="flex-1 min-w-0">
                  <p
                    class="font-medium text-sm text-neutral-900 dark:text-neutral-100 truncate"
                  >
                    {{ portfolio.name }}
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  <div>
                    <wlt-input-number
                      [control]="getControl(portfolio.id)"
                      [id]="'target-' + portfolio.id"
                      size="small"
                    />
                  </div>
                  <span
                    class="text-sm font-semibold text-neutral-600 dark:text-neutral-400 min-w-[20px]"
                  >
                    %
                  </span>
                </div>
              </div>

              <!-- Hover effect gradient -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-100/50 dark:via-neutral-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              ></div>
            </div>
            }
          </form>

          <!-- Total Allocation Card -->
          <div
            class="mt-4 relative overflow-hidden rounded-xl border transition-all duration-300"
            [class]="
              totalPercentage() === 100
                ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20 border-emerald-300 dark:border-emerald-700 shadow-lg shadow-emerald-100 dark:shadow-emerald-900/30'
                : 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/40 dark:to-red-900/20 border-red-300 dark:border-red-700'
            "
          >
            <!-- Background pattern -->
            <div class="absolute inset-0 opacity-5">
              <div
                class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
              ></div>
            </div>

            <div class="relative p-5">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <i
                    class="text-lg"
                    [class]="
                      totalPercentage() === 100
                        ? 'pi pi-check-circle text-emerald-600 dark:text-emerald-400'
                        : 'pi pi-exclamation-triangle text-red-600 dark:text-red-400'
                    "
                  >
                  </i>
                  <span
                    class="font-semibold"
                    [class]="
                      totalPercentage() === 100
                        ? 'text-emerald-900 dark:text-emerald-100'
                        : 'text-red-900 dark:text-red-100'
                    "
                  >
                    Total Allocation
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <span
                    class="text-3xl font-bold tracking-tight"
                    [class]="
                      totalPercentage() === 100
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-red-700 dark:text-red-300'
                    "
                  >
                    {{ totalPercentage() }}
                  </span>
                  <span
                    class="text-xl font-semibold"
                    [class]="
                      totalPercentage() === 100
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-600 dark:text-red-400'
                    "
                  >
                    %
                  </span>
                </div>
              </div>

              @if (totalPercentage() !== 100) {
              <div
                class="flex items-center gap-2 text-sm font-medium pt-2 border-t"
                [class]="
                  'border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                "
              >
                <i class="pi pi-info-circle text-xs"></i>
                <span>
                  {{
                    totalPercentage() > 100 ? 'Exceeds target by' : 'Short by'
                  }}
                  <span class="font-bold"
                    >{{ Math.abs(100 - totalPercentage()) }}%</span
                  >
                </span>
              </div>
              } @else {
              <div
                class="flex items-center gap-2 text-sm font-medium pt-2 border-t border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
              >
                <i class="pi pi-check text-xs"></i>
                <span>Perfect allocation</span>
              </div>
              }
            </div>
          </div>
        </div>

        <!-- Chart Preview Section -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2 mb-2">
            <div class="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <i class="pi pi-eye text-neutral-600 dark:text-neutral-400"></i>
            </div>
            <h4 class="font-semibold text-neutral-900 dark:text-neutral-100">
              Live Preview
            </h4>
          </div>

          <div
            class="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm"
          >
            <div class="h-full min-h-[320px]">
              <wlt-chart [config]="chartConfig" [data]="chartData()" />
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 gap-3">
            <div
              class="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
            >
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                Portfolios
              </p>
              <p
                class="text-xl font-bold text-neutral-900 dark:text-neutral-100"
              >
                {{ portfolios.length }}
              </p>
            </div>
            <div
              class="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
            >
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                Status
              </p>
              <p
                class="text-xl font-bold"
                [class]="
                  totalPercentage() === 100
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                "
              >
                {{ totalPercentage() === 100 ? 'Valid' : 'Invalid' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions Footer -->
      <div
        class="flex justify-between items-center pt-6 border-t border-neutral-200 dark:border-neutral-700"
      >
        <wlt-button
          label="Cancel"
          icon="pi pi-times"
          severity="secondary"
          [outlined]="true"
          (onClick)="onCancel()"
        />

        <div class="flex items-center gap-3">
          @if (totalPercentage() !== 100) {
          <span class="text-sm text-neutral-500 dark:text-neutral-400 italic">
            Adjust percentages to enable saving
          </span>
          }
          <wlt-button
            label="Save Preferences"
            icon="pi pi-save"
            severity="primary"
            [disabled]="totalPercentage() !== 100"
            (onClick)="onSave()"
          />
        </div>
      </div>
    </div>
  `,
})
export class PreferencesEditorComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly ref = inject(DynamicDialogRef);
  private readonly config = inject(DynamicDialogConfig);

  protected form!: FormGroup<PortfolioPreferenceForm>;
  protected portfolios: PortfolioDto[] = [];
  protected readonly Math = Math;

  protected readonly totalPercentage = signal(0);

  protected readonly chartData = computed(() => {
    const values = this.portfolios.map((p) => ({
      name: p.name,
      value: this.getControl(p.id).value || 0,
      color: p.color,
    }));

    return {
      labels: values.map((v) => v.name),
      datasets: [
        {
          data: values.map((v) => v.value),
          backgroundColor: values.map((v) => v.color),
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverBorderWidth: 4,
        },
      ],
    };
  });

  protected readonly chartConfig: ChartConfig = {
    type: 'doughnut',
    title: 'Target Allocation',
    height: '100%',
    showTitle: false,
    dataType: 'percentage',
    options: {
      cutout: '65%',
      plugins: {
        legend: {
          display: false,
        },
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

  ngOnInit() {
    const preferences =
      (this.config.data?.preferences as PreferencesData[]) || [];
    this.portfolios = (this.config.data?.portfolios as PortfolioDto[]) || [];

    const controls: PortfolioPreferenceForm = {};
    this.portfolios.forEach((portfolio) => {
      const existingPref = preferences.find(
        (p) => p.portfolioId === portfolio.id
      );
      controls[portfolio.id] = this.fb.control(
        existingPref?.targetPercentage || 0
      );
    });

    this.form = this.fb.group(controls);

    this.form.valueChanges.subscribe(() => {
      this.updateTotal();
    });

    this.updateTotal();
  }

  protected getControl(portfolioId: string): FormControl<number> {
    return this.form.controls[portfolioId] as FormControl<number>;
  }

  private updateTotal() {
    const total = Object.values(this.form.value).reduce(
      (sum, val) => sum + (val || 0),
      0
    );
    this.totalPercentage.set(total);
  }

  protected onCancel() {
    this.ref.close(null);
  }

  protected onSave() {
    if (this.totalPercentage() !== 100) {
      return;
    }

    const preferences: PreferencesData[] = this.portfolios.map((portfolio) => ({
      portfolioId: portfolio.id,
      name: portfolio.name,
      targetPercentage: this.getControl(portfolio.id).value || 0,
      color: portfolio.color,
    }));

    this.ref.close(preferences);
  }
}
