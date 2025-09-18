import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes,withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    importProvidersFrom(BsDatepickerModule.forRoot()) // Import bsDatepicker global providers here
  ]
};
