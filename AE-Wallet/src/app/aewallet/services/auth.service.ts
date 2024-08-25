import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UriCostants } from '../utils/uri-costants';
import { UserDto } from '../../shared/models/user.model';
import { setHttpParams } from '../../shared/utils/http-params';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(UriCostants.authPath, { username, password });
  }

  getUserInfo(token: string): Observable<UserDto> {
    let params = new HttpParams();
    params = setHttpParams(params, { token });

    return this.http.get<UserDto>(`${UriCostants.authPath}/user-info`, {
      params,
    });
  }
}
