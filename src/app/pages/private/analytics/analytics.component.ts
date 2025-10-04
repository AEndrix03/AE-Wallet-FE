import { Component, inject, signal } from '@angular/core';
import { AnalyticsGeneralPortfoliosComponent } from './analytics-general-portfolios/analytics-general-portfolios.component';
import { CardComponent } from '../../../core/components/card/card.component';
import { AnalyticsPortfoliosTopComponent } from './analytics-portfolios-top/analytics-portfolios-top.component';
import {
  AllocationData,
  PortfolioDeviationData,
  PreferencesData,
} from '../../../core/models/analytics.models';
import { AnalyticsIncomeExpenseComponent } from './analytics-income-expense/analytics-income-expense.component';
import { AnalyticsSummaryComponent } from './analytics-summary/analytics-summary.component';
import { AnalyticsCategoryComponent } from './analytics-category/analytics-category.component';
import {
  CategorySpendingData,
  FinancialSummaryData,
  IncomeExpenseData,
} from '../../../core/models/transaction.models';
import { AnalyticsPreferencesComponent } from './analytics-preferences/analytics-preferences.component';
import { Observable, of } from 'rxjs';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { userStore } from '@aredegalli/ng-auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'wlt-analytics',
  imports: [
    AnalyticsGeneralPortfoliosComponent,
    CardComponent,
    AnalyticsPortfoliosTopComponent,
    AnalyticsIncomeExpenseComponent,
    AnalyticsSummaryComponent,
    AnalyticsCategoryComponent,
    AnalyticsPreferencesComponent,
    AsyncPipe,
  ],
  templateUrl: './analytics.component.html',
  providers: [AnalyticsService],
})
export class AnalyticsComponent {
  protected readonly deviationData = signal<PortfolioDeviationData[]>([]);
  protected readonly partitionsData = signal<AllocationData[]>([]);
  protected readonly preferedPartitionsData = signal<PreferencesData[]>([]);
  protected readonly incomeExpenseData$: Observable<IncomeExpenseData[]> = of(
    []
  );
  protected readonly kpi$: Observable<FinancialSummaryData> = of(null);
  protected readonly categoryData$: Observable<CategorySpendingData[]> = of([]);

  private readonly analyticsService = inject(AnalyticsService);
  private readonly userStore = inject(userStore);

  constructor() {
    this.deviationData.set([
      {
        portfolioId: 'emergency',
        name: 'Emergency Fund',
        color: '#dc2626',
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
        color: '#059669',
        targetAllocation: 35,
        monthlyData: [
          {
            month: '2024-06',
            date: new Date('2024-06-01'),
            actualAllocation: 25.2,
            targetAllocation: 35,
            deviationPercentage: -28.0,
            absoluteDeviation: 28.0,
          },
          {
            month: '2024-07',
            date: new Date('2024-07-01'),
            actualAllocation: 27.8,
            targetAllocation: 35,
            deviationPercentage: -20.6,
            absoluteDeviation: 20.6,
          },
          {
            month: '2024-08',
            date: new Date('2024-08-01'),
            actualAllocation: 31.5,
            targetAllocation: 35,
            deviationPercentage: -10.0,
            absoluteDeviation: 10.0,
          },
          {
            month: '2024-09',
            date: new Date('2024-09-01'),
            actualAllocation: 34.1,
            targetAllocation: 35,
            deviationPercentage: -2.6,
            absoluteDeviation: 2.6,
          },
        ],
        statistics: {
          averageDeviation: 15.3,
          maxDeviation: 28.0,
          minDeviation: 2.6,
          trend: 'improving',
          rating: 3,
          rank: 2,
        },
      },
      {
        portfolioId: 'daily',
        name: 'Daily Expenses',
        color: '#2563eb',
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
            actualAllocation: 18.5,
            targetAllocation: 20,
            deviationPercentage: -7.5,
            absoluteDeviation: 7.5,
          },
        ],
        statistics: {
          averageDeviation: 12.0,
          maxDeviation: 24.0,
          minDeviation: 6.0,
          trend: 'improving',
          rating: 3,
          rank: 3,
        },
      },
      {
        portfolioId: 'discretionary',
        name: 'Fun Money',
        color: '#7c3aed',
        targetAllocation: 5,
        monthlyData: [
          {
            month: '2024-06',
            date: new Date('2024-06-01'),
            actualAllocation: 11.5,
            targetAllocation: 5,
            deviationPercentage: +130.0,
            absoluteDeviation: 130.0,
          },
          {
            month: '2024-07',
            date: new Date('2024-07-01'),
            actualAllocation: 8.9,
            targetAllocation: 5,
            deviationPercentage: +78.0,
            absoluteDeviation: 78.0,
          },
          {
            month: '2024-08',
            date: new Date('2024-08-01'),
            actualAllocation: 7.5,
            targetAllocation: 5,
            deviationPercentage: +50.0,
            absoluteDeviation: 50.0,
          },
          {
            month: '2024-09',
            date: new Date('2024-09-01'),
            actualAllocation: 7.3,
            targetAllocation: 5,
            deviationPercentage: +46.0,
            absoluteDeviation: 46.0,
          },
        ],
        statistics: {
          averageDeviation: 76.0,
          maxDeviation: 130.0,
          minDeviation: 46.0,
          trend: 'improving',
          rating: 1,
          rank: 4,
        },
      },
    ]);

    this.partitionsData.set([
      {
        portfolioId: 'emergency',
        name: 'Emergency Fund',
        amount: 18750.25,
        percentage: 39.7,
        color: '#dc2626',
      },
      {
        portfolioId: 'investment',
        name: 'Investment Portfolio',
        amount: 17050.8,
        percentage: 36.1,
        color: '#059669',
      },
      {
        portfolioId: 'daily',
        name: 'Daily Expenses',
        amount: 9820.5,
        percentage: 20.8,
        color: '#2563eb',
      },
      {
        portfolioId: 'discretionary',
        name: 'Fun Money',
        amount: 1510.25,
        percentage: 3.2,
        color: '#7c3aed',
      },
    ]);

    this.preferedPartitionsData.set([
      {
        portfolioId: 'emergency',
        name: 'Emergency Fund',
        targetPercentage: 40,
        color: '#dc2626',
      },
      {
        portfolioId: 'investment',
        name: 'Investment Portfolio',
        targetPercentage: 35,
        color: '#059669',
      },
      {
        portfolioId: 'daily',
        name: 'Daily Expenses',
        targetPercentage: 20,
        color: '#2563eb',
      },
      {
        portfolioId: 'discretionary',
        name: 'Fun Money',
        targetPercentage: 5,
        color: '#7c3aed',
      },
    ]);

    this.kpi$ = this.analyticsService.getKpi(this.userStore.user()?.id);
    this.incomeExpenseData$ = this.analyticsService.getIncomeExpenseData(
      this.userStore.user()?.id
    );
    this.categoryData$ = this.analyticsService.getCategorySpendingData(
      this.userStore.user()?.id
    );
  }
}
