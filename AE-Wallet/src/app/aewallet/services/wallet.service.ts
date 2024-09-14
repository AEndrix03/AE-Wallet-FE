import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  WalletDto,
  WalletCreateDto,
  EntryDto,
} from '../store/models/wallet.model';
import { UriCostants } from '../utils/uri-costants';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  getUserWallets(): Observable<WalletDto[]> {
    return this.http.get<WalletDto[]>(`${UriCostants.walletPath}/user`);
  }

  getWallet(walletId: number): Observable<WalletDto> {
    return this.http.get<WalletDto>(
      `${UriCostants.walletPath}/user/${walletId}`
    );
  }

  createWallet(walletCreateDto: WalletCreateDto): Observable<number> {
    return this.http.post<number>(`${UriCostants.walletPath}`, walletCreateDto);
  }

  deleteWallet(walletId: number): Observable<number> {
    return this.http.delete<number>(`${UriCostants.walletPath}/${walletId}`);
  }

  updateWallet(walletDto: WalletDto): Observable<number> {
    return this.http.put<number>(`${UriCostants.walletPath}`, walletDto);
  }

  getWalletEntries(walletId: number): Observable<EntryDto[]> {
    return this.http.get<EntryDto[]>(
      `${UriCostants.walletPath}/${walletId}/entries`
    );
  }

  getWalletEntryById(entryId: number): Observable<EntryDto> {
    return this.http.get<EntryDto>(
      `${UriCostants.walletPath}/entry/${entryId}`
    );
  }

  createEntry(entryDto: EntryDto): Observable<number> {
    return this.http.post<number>(`${UriCostants.walletPath}/entry`, entryDto);
  }

  updateEntry(entryDto: EntryDto): Observable<number> {
    return this.http.put<number>(`${UriCostants.walletPath}/entry`, entryDto);
  }

  deleteEntry(entryId: number): Observable<number> {
    return this.http.delete<number>(
      `${UriCostants.walletPath}/entry/${entryId}`
    );
  }

  getWalletBalance(walletId: number): Observable<number> {
    return this.http.get<number>(
      `${UriCostants.walletPath}/${walletId}/balance`
    );
  }
}
