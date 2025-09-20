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
