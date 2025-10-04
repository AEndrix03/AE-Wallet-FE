import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreferencesData } from '../models/analytics.models';

@Injectable()
export class SettingsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/settings';

  getUserPreferences(userId: string): Observable<PreferencesData[]> {
    return this.http.get<PreferencesData[]>(`${this.baseUrl}/user/${userId}`);
  }

  savePreferences(
    userId: string,
    preferences: PreferencesData[]
  ): Observable<PreferencesData[]> {
    return this.http.post<PreferencesData[]>(
      `${this.baseUrl}/user/${userId}`,
      preferences
    );
  }
}
