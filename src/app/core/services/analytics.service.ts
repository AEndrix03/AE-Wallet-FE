import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CategorySpendingData,
  FinancialSummaryData,
  IncomeExpenseData,
} from '../models/transaction.models';
import { UriConstants } from '../utils/uri-constants';
import { HttpUtils } from '../utils/http.utils';

@Injectable()
export class AnalyticsService {
  private readonly http = inject(HttpClient);

  public getKpi(userId: string): Observable<FinancialSummaryData> {
    const params = HttpUtils.getParams({ userId });
    return this.http.get<FinancialSummaryData>(
      `${UriConstants.analyticsUrl}/kpi`,
      { params }
    );
  }

  public getIncomeExpenseData(userId: string): Observable<IncomeExpenseData[]> {
    const params = HttpUtils.getParams({ userId });
    return this.http.get<IncomeExpenseData[]>(
      `${UriConstants.analyticsUrl}/income-expense`,
      { params }
    );
  }

  public getCategorySpendingData(
    userId: string
  ): Observable<CategorySpendingData[]> {
    const params = HttpUtils.getParams({ userId });
    return this.http.get<CategorySpendingData[]>(
      `${UriConstants.analyticsUrl}/category-spending`,
      { params }
    );
  }
}
