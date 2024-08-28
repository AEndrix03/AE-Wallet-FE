import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UriCostants } from '../utils/uri-costants';
import { UserDto } from '../../shared/models/user.model';
import { setHttpParams } from '../../shared/utils/http-params';
import { LoginDto, TokenDto } from '../store/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginDto: LoginDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${UriCostants.authPath}/login`, loginDto);
  }

  getUserInfo(): Observable<UserDto> {
    return this.http.get<UserDto>(`${UriCostants.authPath}/user-info`);
  }
}
