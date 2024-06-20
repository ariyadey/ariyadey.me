import { provideHttpClient } from "@angular/common/http";
import {
  APP_INITIALIZER,
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection, provideZoneChangeDetection
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideTransloco, TranslocoService } from "@jsverse/transloco";
import { provideTranslocoLocale } from "@jsverse/transloco-locale";
import { TranslocoHttpLoader } from "@main/shared/transloco-http-loader";
import { forkJoin } from "rxjs";
import { routes } from "./app.routes";

function loadActiveTranslation(translationService: TranslocoService) {
  return () => forkJoin([translationService.load("en"), translationService.load("fa")]);
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadActiveTranslation,
      deps: [TranslocoService],
      multi: true,
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ["en", "fa"],
        defaultLang: "en",
        reRenderOnLangChange: true,
        interpolation: ["{", "}"],
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoLocale({
      langToLocaleMapping: {
        en: "en-us",
        fa: "fa-ir",
      },
    }),
    { provide: Window, useValue: window },
  ],
};
