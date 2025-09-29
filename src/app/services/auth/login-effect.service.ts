import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { PRAETOR_LOGIN_EFFECTS } from '@aredegalli/ng-auth';
import { UserService } from '../../core/services/user.service';
import { catchError, filter, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginEffectService {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  public readonly effect = () =>
    this.userService
      .hello()
      .pipe(
        catchError((err) => {
          console.log(err);
          return null;
        }),
        filter((res) => res != null),
        tap(() => this.router.navigate(['/dashboard']))
      )
      .subscribe();
}

export function provideLoginEffect() {
  return {
    provide: PRAETOR_LOGIN_EFFECTS,
    useFactory: (s: LoginEffectService) => s.effect,
    deps: [LoginEffectService],
    multi: true,
  };
}
