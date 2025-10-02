import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TransactionDto,
  TransactionFilterDto,
  TransactionTypeDto,
} from '../models/transaction.models';
import { Page, PaginationParams } from '../models/core.models';
import { UriConstants } from '../utils/uri-constants';
import { HttpUtils } from '../utils/http.utils';

@Injectable()
export class TransactionService {
  private readonly http = inject(HttpClient);

  public getAllTransactionTypes(): Observable<TransactionTypeDto[]> {
    return this.http.get<TransactionTypeDto[]>(
      `${UriConstants.transactionUrl}/types`
    );
  }

  public getUserTransactionsFiltered(
    userId: string,
    filter: Partial<TransactionFilterDto>,
    pageable: PaginationParams
  ): Observable<Page<TransactionDto>> {
    const params = HttpUtils.getParams({ userId, ...filter, ...pageable });
    return this.http.get<Page<TransactionDto>>(
      `${UriConstants.transactionUrl}/user`,
      { params }
    );
  }

  public getPortfolioTransactions(
    portfolioId: string,
    pageable: PaginationParams
  ): Observable<Page<TransactionDto>> {
    const params = HttpUtils.getParams({ portfolioId, ...pageable });
    return this.http.get<Page<TransactionDto>>(
      `${UriConstants.transactionUrl}/portfolio`,
      { params }
    );
  }

  public saveTransaction(save: TransactionDto): Observable<string> {
    return this.http.patch<string>(`${UriConstants.transactionUrl}`, save);
  }

  public deleteTransaction(id: string): Observable<string> {
    const params = HttpUtils.getParams({ id });
    return this.http.delete<string>(`${UriConstants.transactionUrl}`, {
      params,
    });
  }
}
