import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { initializeAppFn } from './services/app-init.service';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  authInterceptor,
  provideLoginComponentConfig,
  providePraetor,
} from '@aredegalli/ng-auth';
import { dateInterceptor } from '@aredegalli/ng-common';
import { environment } from './environments/environment.prod';
import { providePrimeNG } from 'primeng/config';
import { provideLoginEffect } from './services/auth/login-effect.service';
import { Preset } from './styles/themes/preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAppInitializer(initializeAppFn),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, dateInterceptor])
    ),
    provideAuth(),
    providePrimeNG({
      theme: {
        preset: Preset,
        options: {
          darkModeSelector: '.printer-dark-mode',
        },
      },
    }),
  ],
};

export function provideAuth() {
  return [
    providePraetor(
      environment.praetorApiUrl,
      environment.applicationName,
      environment.praetorAuthApplicationName
    ),
    provideLoginEffect(),
    provideLoginComponentConfig({
      title: 'Welcome Back',
      iconCard: 'pi pi-wallet',
      subtitle: 'Sign in to access your AE Wallet',
      showCreateAccount: true,
      showAppleLogin: true,
      showGoogleLogin: true,
      showGithubLogin: true,
      showForgotPassword: true,
      showRememberMe: true,
    }),
  ];
}
