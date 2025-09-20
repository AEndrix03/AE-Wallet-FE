import { Component, signal, WritableSignal } from '@angular/core';
import { AnalyticsGeneralPortfoliosComponent } from './analytics-general-portfolios/analytics-general-portfolios.component';
import { CardComponent } from '../../../core/components/card/card.component';
import { AnalyticsPortfoliosTopComponent } from './analytics-portfolios-top/analytics-portfolios-top.component';
import {
  AllocationData,
  PortfolioDeviationData,
  PreferencesData,
} from '../../../core/models/analytics.models';
import { AnalyticsPreferencesComponent } from './analytics-preferences/analytics-preferences.component';

@Component({
  selector: 'wlt-analytics',
  imports: [
    AnalyticsGeneralPortfoliosComponent,
    CardComponent,
    AnalyticsPortfoliosTopComponent,
    AnalyticsPreferencesComponent,
  ],
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent {
  protected readonly deviationData: WritableSignal<PortfolioDeviationData[]> =
    signal([]);

  protected readonly partitionsData: WritableSignal<AllocationData[]> = signal(
    []
  );
  protected readonly preferedPartitionsData: WritableSignal<PreferencesData[]> =
    signal([]);

  constructor() {
    this.deviationData.set([
      {
        portfolioId: 'emergency',
        name: 'Emergency Fund',
        color: '#ef4444',
        targetAllocation: 40,
        monthlyData: [
          {
            month: '2024-06',
            date: new Date('2024-06-01'),
            actualAllocation: 38.5,
            targetAllocation: 40,
            deviationPercentage: -3.75,
            absoluteDeviation: 3.75,
          },
          {
            month: '2024-07',
            date: new Date('2024-07-01'),
            actualAllocation: 41.2,
            targetAllocation: 40,
            deviationPercentage: +3.0,
            absoluteDeviation: 3.0,
          },
          {
            month: '2024-08',
            date: new Date('2024-08-01'),
            actualAllocation: 39.8,
            targetAllocation: 40,
            deviationPercentage: -0.5,
            absoluteDeviation: 0.5,
          },
          {
            month: '2024-09',
            date: new Date('2024-09-01'),
            actualAllocation: 40.1,
            targetAllocation: 40,
            deviationPercentage: +0.25,
            absoluteDeviation: 0.25,
          },
        ],
        statistics: {
          averageDeviation: 1.875,
          maxDeviation: 3.75,
          minDeviation: 0.25,
          trend: 'improving',
          rating: 5,
          rank: 1,
        },
      },
      {
        portfolioId: 'investment',
        name: 'Investment Portfolio',
        color: '#10b981',
        targetAllocation: 30,
        monthlyData: [
          {
            month: '2024-06',
            date: new Date('2024-06-01'),
            actualAllocation: 25.2,
            targetAllocation: 30,
            deviationPercentage: -16.0,
            absoluteDeviation: 16.0,
          },
          {
            month: '2024-07',
            date: new Date('2024-07-01'),
            actualAllocation: 27.8,
            targetAllocation: 30,
            deviationPercentage: -7.33,
            absoluteDeviation: 7.33,
          },
          {
            month: '2024-08',
            date: new Date('2024-08-01'),
            actualAllocation: 31.5,
            targetAllocation: 30,
            deviationPercentage: +5.0,
            absoluteDeviation: 5.0,
          },
          {
            month: '2024-09',
            date: new Date('2024-09-01'),
            actualAllocation: 29.1,
            targetAllocation: 30,
            deviationPercentage: -3.0,
            absoluteDeviation: 3.0,
          },
        ],
        statistics: {
          averageDeviation: 7.83,
          maxDeviation: 16.0,
          minDeviation: 3.0,
          trend: 'improving',
          rating: 4,
          rank: 2,
        },
      },
      {
        portfolioId: 'daily',
        name: 'Daily Expenses',
        color: '#3b82f6',
        targetAllocation: 20,
        monthlyData: [
          {
            month: '2024-06',
            date: new Date('2024-06-01'),
            actualAllocation: 24.8,
            targetAllocation: 20,
            deviationPercentage: +24.0,
            absoluteDeviation: 24.0,
          },
          {
            month: '2024-07',
            date: new Date('2024-07-01'),
            actualAllocation: 22.1,
            targetAllocation: 20,
            deviationPercentage: +10.5,
            absoluteDeviation: 10.5,
          },
          {
            month: '2024-08',
            date: new Date('2024-08-01'),
            actualAllocation: 21.2,
            targetAllocation: 20,
            deviationPercentage: +6.0,
            absoluteDeviation: 6.0,
          },
          {
            month: '2024-09',
            date: new Date('2024-09-01'),
            actualAllocation: 22.8,
            targetAllocation: 20,
            deviationPercentage: +14.0,
            absoluteDeviation: 14.0,
          },
        ],
        statistics: {
          averageDeviation: 13.625,
          maxDeviation: 24.0,
          minDeviation: 6.0,
          trend: 'worsening',
          rating: 2,
          rank: 4,
        },
      },
      {
        portfolioId: 'discretionary',
        name: 'Fun Money',
        color: '#8b5cf6',
        targetAllocation: 10,
        monthlyData: [
          {
            month: '2024-06',
            date: new Date('2024-06-01'),
            actualAllocation: 11.5,
            targetAllocation: 10,
            deviationPercentage: +15.0,
            absoluteDeviation: 15.0,
          },
          {
            month: '2024-07',
            date: new Date('2024-07-01'),
            actualAllocation: 8.9,
            targetAllocation: 10,
            deviationPercentage: -11.0,
            absoluteDeviation: 11.0,
          },
          {
            month: '2024-08',
            date: new Date('2024-08-01'),
            actualAllocation: 7.5,
            targetAllocation: 10,
            deviationPercentage: -25.0,
            absoluteDeviation: 25.0,
          },
          {
            month: '2024-09',
            date: new Date('2024-09-01'),
            actualAllocation: 8.0,
            targetAllocation: 10,
            deviationPercentage: -20.0,
            absoluteDeviation: 20.0,
          },
        ],
        statistics: {
          averageDeviation: 17.75,
          maxDeviation: 25.0,
          minDeviation: 11.0,
          trend: 'stable',
          rating: 3,
          rank: 3,
        },
      },
    ]);
    this.partitionsData.set([
      {
        portfolioId: 'emergency',
        name: 'Emergency Fund',
        amount: 15000,
        percentage: 37.5, // Leggermente sotto target
        color: '#ef4444',
      },
      {
        portfolioId: 'investment',
        name: 'Investment Portfolio',
        amount: 8000,
        percentage: 20, // Molto sotto target
        color: '#10b981',
      },
      {
        portfolioId: 'daily',
        name: 'Daily Expenses',
        amount: 12000,
        percentage: 30, // Sopra target
        color: '#3b82f6',
      },
      {
        portfolioId: 'discretionary',
        name: 'Fun Money',
        amount: 5000,
        percentage: 12.5, // Sopra target
        color: '#8b5cf6',
      },
    ]);
    this.preferedPartitionsData.set([
      {
        portfolioId: 'emergency',
        name: 'Emergency Fund',
        targetPercentage: 40,
        color: '#ef4444',
      },
      {
        portfolioId: 'investment',
        name: 'Investment Portfolio',
        targetPercentage: 35, // Target più alto
        color: '#10b981',
      },
      {
        portfolioId: 'daily',
        name: 'Daily Expenses',
        targetPercentage: 20,
        color: '#3b82f6',
      },
      {
        portfolioId: 'discretionary',
        name: 'Fun Money',
        targetPercentage: 5, // Target più basso
        color: '#8b5cf6',
      },
    ]);
  }
}

/*
Idee:

- Grafici di categoria
- Grafiici di andamento spese/entrate
- Grafici di trend mensile/annuale
- Torta di ripartizione spese/entrate + torta di ripartizione desiderata
- Valutazioni e suggerimenti basati sui dati delle torte: si calcoala la differenza tra spese effettive e desiderate e si forniscono consigli su come migliorare la gestione finanziaria.
- Grafico multilinea con l'andamento delle valutazioni dei portfolio nel tempo: si calcola per ogni periodo la vlautazione (quanto il desiderato viene sforato dal reale) in percentuale e si reappresenta per ogni portfolio. Di  lato mettere una classifica dei primi 10
 */