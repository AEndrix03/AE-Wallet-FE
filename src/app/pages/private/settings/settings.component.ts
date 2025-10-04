import { Component, inject, signal } from '@angular/core';
import { userStore } from '@aredegalli/ng-auth';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { PreferencesData } from '../../../core/models/analytics.models';
import { PortfolioDto } from '../../../core/models/portfolio.models';
import { SettingsService } from '../../../core/services/settings.service';
import { PreferencesSettingsCardComponent } from './preferences-settings-card/preferences-settings-card.component';

@Component({
  selector: 'wlt-settings',
  standalone: true,
  imports: [PreferencesSettingsCardComponent],
  template: `
    <div class="container mx-auto p-6">
      <h1
        class="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100"
      >
        Settings
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Preferences Card -->
        <wlt-preferences-settings-card
          [currentPreferences]="preferences()"
          [availablePortfolios]="portfolios()"
          (onSave)="savePreferences($event)"
        />

        <!-- Altri settings cards... -->
      </div>
    </div>
  `,
  providers: [PortfolioService, SettingsService],
})
export class SettingsComponent {
  private readonly portfolioService = inject(PortfolioService);
  private readonly preferencesService = inject(SettingsService);
  private readonly userStore = inject(userStore);

  protected readonly preferences = signal<PreferencesData[]>([]);
  protected readonly portfolios = signal<PortfolioDto[]>([]);

  constructor() {
    this.loadData();
  }

  private loadData() {
    const userId = this.userStore.user()?.id;

    // Carica portfolios
    this.portfolioService
      .getAllUserPortfolios(userId)
      .subscribe((portfolios) => {
        this.portfolios.set(portfolios);
      });

    // Carica preferences esistenti
    this.preferencesService.getUserPreferences(userId).subscribe((prefs) => {
      this.preferences.set(prefs);
    });
  }

  protected savePreferences(preferences: PreferencesData[]) {
    const userId = this.userStore.user()?.id;

    this.preferencesService.savePreferences(userId, preferences).subscribe({
      next: (saved) => {
        this.preferences.set(saved);
        // Mostra notifica di successo
        console.log('Preferences saved successfully');
      },
      error: (err) => {
        // Mostra notifica di errore
        console.error('Error saving preferences', err);
      },
    });
  }
}
