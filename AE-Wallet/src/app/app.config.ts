import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  authFeatureKey,
  authReducer,
} from './aewallet/store/reducers/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthEffects } from './aewallet/store/effects/auth.effect';
import { authInterceptor } from './shared/services/interceptors/auth-interceptor';
import {
  walletReducer,
  walletsFeatureKey,
} from './aewallet/store/reducers/wallets.reducer';
import { WalletEffects } from './aewallet/store/effects/wallets.effect';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    // Stores
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(authFeatureKey, authReducer),
    provideEffects(AuthEffects),
    provideState(walletsFeatureKey, walletReducer),
    provideEffects(WalletEffects),
    //Date
    provideNativeDateAdapter(),
  ],
};
