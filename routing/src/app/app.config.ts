import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { CustomPreloadingStrategy } from './core/preloading/custom-preloading.strategy';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(CustomPreloadingStrategy),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    CustomPreloadingStrategy
  ]
};