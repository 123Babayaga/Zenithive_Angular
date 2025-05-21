import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
// import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
// import { productReducer } from '../store/reducer/product.reducer';
// import { productEffects } from '../store/effects/product.effects';
import {
  provideStoreDevtools,
  StoreDevtoolsModule,
} from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideStore({ products: productReducer }),
    provideRouter(routes),
    // provideHttpClient(),
    // provideClientHydration(withEventReplay()),
    // provideEffects([productEffects]),
    // provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
