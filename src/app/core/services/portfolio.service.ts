import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PortfolioDto,
  PortfolioSaveDto,
  PortfolioStatusDto,
  PortfolioTypeDto,
} from '../models/portfolio.models';
import { UriConstants } from '../utils/uri-constants';

@Injectable()
export class PortfolioService {
  private readonly http = inject(HttpClient);

  public getAllPortfolioTypes(): Observable<PortfolioTypeDto[]> {
    return this.http.get<PortfolioTypeDto[]>(
      `${UriConstants.portfolioUrl}/types`
    );
  }

  public getAllPortfolioStatuses(): Observable<PortfolioStatusDto[]> {
    return this.http.get<PortfolioStatusDto[]>(
      `${UriConstants.portfolioUrl}/statuses`
    );
  }

  public getAllUserPortfolios(id: string): Observable<PortfolioDto[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get<PortfolioDto[]>(`${UriConstants.portfolioUrl}/user`, {
      params,
    });
  }

  public getPortfolioById(id: string): Observable<PortfolioDto | null> {
    const params = new HttpParams().set('id', id);
    return this.http.get<PortfolioDto | null>(`${UriConstants.portfolioUrl}`, {
      params,
    });
  }

  public savePortfolio(save: PortfolioSaveDto): Observable<string> {
    return this.http.patch<string>(`${UriConstants.portfolioUrl}`, save);
  }

  public deletePortfolio(id: string): Observable<string> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<string>(`${UriConstants.portfolioUrl}`, { params });
  }
}
