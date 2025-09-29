import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userStore } from '@aredegalli/ng-auth';
import { UriConstants } from '../utils/uri-constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly userStore = inject(userStore);

  public hello(): Observable<boolean> {
    const params = new HttpParams();
    params.set('id', this.userStore.user().id);
    return this.http.get<boolean>(UriConstants.userUrl, { params });
  }
}
