import { Currency } from '../enums/core.enums';
import {
  TransactionCategoryEnum,
  TransactionTypeEnum,
} from '../enums/transaction.enums';

export interface TransactionFilterDto {
  description: string;
  amount: number;
  currency: Currency;
  category: TransactionCategoryEnum;
  type: TransactionTypeEnum;
  dateFrom: Date;
  dateTo: Date;
}

export interface TransactionDto {
  id: string;
  description: string;
  amount: number;
  currency: Currency;
  category: TransactionCategoryEnum;
  type: TransactionTypeEnum;
  date: Date;
  portfolioId: string;
  portfolioName: string;
  note: string;
}

export interface IncomeExpenseData {
  month: string;
  date: Date;
  income: number;
  expense: number;
  netFlow: number;
}

export interface CategorySpendingData {
  category: TransactionCategoryEnum;
  name: string;
  amount: number;
  percentage: number;
  color: string;
  transactionCount: number;
}

export interface FinancialSummaryData {
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netFlow: number;
  savingsRate: number;
  expenseChange: number; // % change from previous month
  incomeChange: number; // % change from previous month
}

export interface FinancialInsight {
  type: 'success' | 'info' | 'warn' | 'error';
  title: string;
  message: string;
  icon: string;
  actionable: boolean;
}
