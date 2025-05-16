import { provideHttpClient } from "@angular/common/http";
import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, withInMemoryScrolling, withRouterConfig } from "@angular/router";
import { provideTransloco, TranslocoService } from "@jsverse/transloco";
import { provideTranslocoLocale } from "@jsverse/transloco-locale";
import { TranslocoHttpLoader } from "@main/shared/i18n/transloco-http-loader";
import { forkJoin, tap } from "rxjs";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const i18nService = inject(TranslocoService);
      return forkJoin([i18nService.load("en"), i18nService.load("fa")]).pipe(
        tap(() => {
          const splashScreen = document.getElementById("splash-screen");
          splashScreen?.classList.add("hidden");
          splashScreen?.addEventListener("transitionend", () => splashScreen.remove());
        }),
      );
    }),
    provideExperimentalZonelessChangeDetection(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: "reload",
      }),
      withInMemoryScrolling({
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
    ),
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
