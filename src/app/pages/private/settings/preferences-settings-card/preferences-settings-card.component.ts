import { Component, inject, input, output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PreferencesData } from '../../../../core/models/analytics.models';
import { PortfolioDto } from '../../../../core/models/portfolio.models';
import { PreferencesEditorComponent } from '../preferences-editor/preferences-editor.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CardComponent } from '../../../../core/components/card/card.component';

@Component({
  selector: 'wlt-preferences-settings-card',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  providers: [DialogService],
  template: `
    <wlt-card>
      <div class="p-6 flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
            <i
              class="pi pi-chart-pie text-emerald-600 dark:text-emerald-400 text-2xl"
            ></i>
          </div>
          <div class="flex-1">
            <h3
              class="text-lg font-semibold text-neutral-900 dark:text-neutral-100"
            >
              Portfolio Allocation Preferences
            </h3>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">
              Set your target allocation percentages
            </p>
          </div>
        </div>

        @if (currentPreferences().length > 0) {
        <div class="flex flex-wrap gap-2">
          @for (pref of currentPreferences(); track pref.portfolioId) {
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800"
          >
            <div
              class="w-2 h-2 rounded-full"
              [style.backgroundColor]="pref.color"
            ></div>
            <span
              class="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              {{ pref.name }}: {{ pref.targetPercentage }}%
            </span>
          </div>
          }
        </div>
        } @else {
        <p class="text-sm text-neutral-500 dark:text-neutral-400 italic">
          No preferences set yet
        </p>
        }

        <wlt-button
          label="Configure Preferences"
          icon="pi pi-cog"
          severity="primary"
          [outlined]="true"
          class="mt-2"
          (onClick)="openEditor()"
        />
      </div>
    </wlt-card>
  `,
})
export class PreferencesSettingsCardComponent {
  private readonly dialogService = inject(DialogService);
  private ref: DynamicDialogRef | null = null;

  public readonly currentPreferences = input.required<PreferencesData[]>();
  public readonly availablePortfolios = input.required<PortfolioDto[]>();
  public readonly onSave = output<PreferencesData[]>();

  protected openEditor() {
    this.ref = this.dialogService.open(PreferencesEditorComponent, {
      header: 'Configure Portfolio Allocation',
      modal: true,
      closeOnEscape: true,
      closable: true,
      width: '70vw',
      data: {
        preferences: this.currentPreferences(),
        portfolios: this.availablePortfolios(),
      },
    });

    this.ref.onClose.subscribe((result: PreferencesData[] | null) => {
      if (result) {
        this.onSave.emit(result);
      }
    });
  }
}
