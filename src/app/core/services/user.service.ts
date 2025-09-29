import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UriConstants } from '../utils/uri-constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  public hello(): Observable<boolean> {
    const params = new HttpParams().set(
      'authenticator',
      environment.praetorAuthApplicationName
    );
    return this.http.get<boolean>(`${UriConstants.userUrl}/hello`, { params });
  }
}
