import { ApplicationConfig, isDevMode, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
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
import { NgLocaleLocalization, registerLocaleData } from '@angular/common';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
  provideMomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { dateTransformInterceptor } from './shared/services/interceptors/date-transform-interceptor';
import {
  NgxCurrencyInputMode,
  provideEnvironmentNgxCurrency,
} from 'ngx-currency';

export const WLT_DATE_FORMATS = {
  parse: {
    dateInput: ['DD/MM/YYYY'],
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthDayA11yLabel: 'MMMM DD',
  },
};

registerLocaleData(NgLocaleLocalization, 'it-IT');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor, dateTransformInterceptor])
    ),
    // Stores
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(authFeatureKey, authReducer),
    provideEffects(AuthEffects),
    provideState(walletsFeatureKey, walletReducer),
    provideEffects(WalletEffects),
    // Date
    provideMomentDateAdapter(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'it-IT',
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: DateAdapter,
      deps: [MAT_DATE_LOCALE],
      useFactory: (locale: string) => {
        const adapter = new MomentDateAdapter(locale);
        return adapter;
      },
    },
    { provide: MAT_DATE_FORMATS, useValue: WLT_DATE_FORMATS },

    // Currency
    provideEnvironmentNgxCurrency({
      align: 'right',
      allowNegative: true,
      allowZero: true,
      decimal: ',',
      precision: 2,
      prefix: '',
      suffix: ' €',
      thousands: '.',
      nullable: true,
      min: null,
      max: null,
      inputMode: NgxCurrencyInputMode.Financial,
    }),
  ],
};
