import {
  ApplicationConfig, provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { initializeAppFn } from './services/app-init.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor, PRAETOR_LOGIN_EFFECTS, providePraetor } from '@aredegalli/ng-auth';
import { dateInterceptor } from '@aredegalli/ng-common';
import { environment } from './environments/environment.prod';
import { providePrimeNG } from 'primeng/config';
import { Preset } from '@nx/workspace/src/generators/utils/presets';
import { provideLoginEffect } from './services/auth/login-effect.service';

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
  ];
}
