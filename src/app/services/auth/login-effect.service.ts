import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { PRAETOR_LOGIN_EFFECTS } from '@aredegalli/ng-auth';

@Injectable({ providedIn: 'root' })
export class LoginEffectService {
  constructor(private readonly router: Router) {}

  effect = () => this.router.navigate(['/dashboard']);
}

export function provideLoginEffect() {
  return {
    provide: PRAETOR_LOGIN_EFFECTS,
      useFactory: (s: LoginEffectService) => s.effect,
    deps: [LoginEffectService],
    multi: true,
  }
}
