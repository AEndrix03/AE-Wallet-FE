import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { AuthFacadeService } from '../../../aewallet/store/auth-facade.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authFacadeService: AuthFacadeService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authFacadeService.selectToken$.pipe(
      take(1),
      filter((token) => !!token && token.length > 0),
      map((token) =>
        request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      ),
      switchMap((request) => next.handle(request))
    );
  }
}
