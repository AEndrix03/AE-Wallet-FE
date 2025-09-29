import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UriConstants } from '../utils/uri-constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  public hello(): Observable<boolean> {
    return this.http.get<boolean>(UriConstants.userUrl);
  }
}
