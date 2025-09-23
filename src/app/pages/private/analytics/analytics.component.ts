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
import { AnalyticsIncomeExpenseComponent } from './analytics-income-expense/analytics-income-expense.component';
import { AnalyticsSummaryComponent } from './analytics-summary/analytics-summary.component';
import { AnalyticsCategoryComponent } from './analytics-category/analytics-category.component';
import {
  CategorySpendingData,
  FinancialSummaryData,
  IncomeExpenseData,
} from '../../../core/models/transaction.models';
import { TransactionCategoryEnum } from '../../../core/enums/transaction.enums';

// Palette colori moderna per tutto il sistema
const MODERN_PALETTE = {
  // Portfolio colors (sofisticati e moderni)
  emergency: '#dc2626', // red-600
  investment: '#059669', // emerald-600
  daily: '#2563eb', // blue-600
  discretionary: '#7c3aed', // violet-600

  // Category colors (gradazioni neutre)
  category1: '#1e293b', // slate-800
  category2: '#334155', // slate-700
  category3: '#475569', // slate-600
  category4: '#64748b', // slate-500
  category5: '#94a3b8', // slate-400
  category6: '#e2e8f0', // slate-200
};

@Component({
  selector: 'wlt-analytics',
  imports: [
    AnalyticsGeneralPortfoliosComponent,
    CardComponent,
    AnalyticsPortfoliosTopComponent,
    AnalyticsPreferencesComponent,
    AnalyticsIncomeExpenseComponent,
    AnalyticsSummaryComponent,
    AnalyticsCategoryComponent,
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
  protected readonly incomeExpenseData: WritableSignal<IncomeExpenseData[]> =
    signal([]);
  protected readonly summaryData: WritableSignal<FinancialSummaryData> = signal(
    {
      currentBalance: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      netFlow: 0,
      savingsRate: 0,
      expenseChange: 0,
      incomeChange: 0,
    }
  );
  protected readonly categoryData: WritableSignal<CategorySpendingData[]> =
    signal([]);

  constructor() {
    this.deviationData.set([
      {
        portfolioId: 'emergency',
        name: 'Emergency Fund',
        color: MODERN_PALETTE.emergency,
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
        color: MODERN_PALETTE.investment,
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
        color: MODERN_PALETTE.daily,
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
        color: MODERN_PALETTE.discretionary,
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

    // Allocation Data (aggiornata con nuovi colori)
    this.partitionsData.set([
      {
        portfolioId: 'emergency',
        name: 'Emergency Fund',
        amount: 18750.25,
        percentage: 39.7,
        color: MODERN_PALETTE.emergency,
      },
      {
        portfolioId: 'investment',
        name: 'Investment Portfolio',
        amount: 17050.8,
        percentage: 36.1,
        color: MODERN_PALETTE.investment,
      },
      {
        portfolioId: 'daily',
        name: 'Daily Expenses',
        amount: 9820.5,
        percentage: 20.8,
        color: MODERN_PALETTE.daily,
      },
      {
        portfolioId: 'discretionary',
        name: 'Fun Money',
        amount: 1510.25,
        percentage: 3.2,
        color: MODERN_PALETTE.discretionary,
      },
    ]);

    this.preferedPartitionsData.set([
      {
        portfolioId: 'emergency',
        name: 'Emergency Fund',
        targetPercentage: 40,
        color: MODERN_PALETTE.emergency,
      },
      {
        portfolioId: 'investment',
        name: 'Investment Portfolio',
        targetPercentage: 35,
        color: MODERN_PALETTE.investment,
      },
      {
        portfolioId: 'daily',
        name: 'Daily Expenses',
        targetPercentage: 20,
        color: MODERN_PALETTE.daily,
      },
      {
        portfolioId: 'discretionary',
        name: 'Fun Money',
        targetPercentage: 5,
        color: MODERN_PALETTE.discretionary,
      },
    ]);

    // Income Expense Data (valori monetari reali)
    this.incomeExpenseData.set([
      {
        month: '2024-06',
        date: new Date('2024-06-01'),
        income: 4200.0,
        expense: 3675.5,
        netFlow: 524.5,
      },
      {
        month: '2024-07',
        date: new Date('2024-07-01'),
        income: 4800.0,
        expense: 4200.25,
        netFlow: 599.75,
      },
      {
        month: '2024-08',
        date: new Date('2024-08-01'),
        income: 4200.0,
        expense: 3950.8,
        netFlow: 249.2,
      },
      {
        month: '2024-09',
        date: new Date('2024-09-01'),
        income: 4650.0,
        expense: 3425.75,
        netFlow: 1224.25,
      },
      {
        month: '2024-10',
        date: new Date('2024-10-01'),
        income: 4200.0,
        expense: 3780.5,
        netFlow: 419.5,
      },
      {
        month: '2024-11',
        date: new Date('2024-11-01'),
        income: 4350.0,
        expense: 4850.25,
        netFlow: -500.25,
      },
    ]);

    // Summary Data
    this.summaryData.set({
      currentBalance: 47131.8, // Somma dei portfolio
      monthlyIncome: 4650.0,
      monthlyExpenses: 3425.75,
      netFlow: 1224.25,
      savingsRate: 26.3,
      expenseChange: -12.5,
      incomeChange: 10.7,
    });

    // Category Data (con palette neutra)
    this.categoryData.set([
      {
        category: TransactionCategoryEnum.CHECKING,
        name: 'Daily Expenses',
        amount: 2850.75,
        percentage: 32.5,
        color: MODERN_PALETTE.category1,
        transactionCount: 47,
      },
      {
        category: TransactionCategoryEnum.SAVINGS,
        name: 'Savings',
        amount: 1500.0,
        percentage: 17.1,
        color: MODERN_PALETTE.category2,
        transactionCount: 4,
      },
      {
        category: TransactionCategoryEnum.INVESTMENT,
        name: 'Investments',
        amount: 1200.0,
        percentage: 13.7,
        color: MODERN_PALETTE.category3,
        transactionCount: 3,
      },
      {
        category: TransactionCategoryEnum.EMERGENCY,
        name: 'Emergency Fund',
        amount: 800.0,
        percentage: 9.1,
        color: MODERN_PALETTE.category4,
        transactionCount: 2,
      },
      {
        category: TransactionCategoryEnum.CASH,
        name: 'Cash Expenses',
        amount: 650.25,
        percentage: 7.4,
        color: MODERN_PALETTE.category5,
        transactionCount: 19,
      },
      {
        category: TransactionCategoryEnum.CRYPTO,
        name: 'Cryptocurrency',
        amount: 700.0,
        percentage: 8.0,
        color: MODERN_PALETTE.category6,
        transactionCount: 5,
      },
    ]);
  }
}
