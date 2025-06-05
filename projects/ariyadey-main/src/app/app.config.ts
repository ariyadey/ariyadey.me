import { APP_BASE_HREF } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import {
  ApplicationConfig,
  DOCUMENT,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from "@angular/core";
import { MAT_CARD_CONFIG, MatCardConfig } from "@angular/material/card";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, withInMemoryScrolling, withRouterConfig } from "@angular/router";
import { provideTransloco } from "@jsverse/transloco";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@main/shared/i18n/i18n.config";
import { I18nService } from "@main/shared/i18n/i18n.service";
import { TranslocoHttpLoader } from "@main/shared/i18n/transloco-http-loader";
import { tap } from "rxjs";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: () => inject(DOCUMENT).querySelector("base[href]")?.getAttribute("href") ?? "/",
    },
    provideAppInitializer(() =>
      inject(I18nService)
        .initialize()
        .pipe(
          tap(() => {
            const splashScreen = document.getElementById("splash-screen")!;
            splashScreen.classList.add("hidden");
            splashScreen.addEventListener("transitionend", () => splashScreen.remove());
          }),
        ),
    ),
    provideZonelessChangeDetection(),
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
        availableLangs: SUPPORTED_LANGUAGES,
        defaultLang: DEFAULT_LANGUAGE,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    { provide: Window, useValue: window },
    { provide: MAT_CARD_CONFIG, useValue: { appearance: "raised" } as MatCardConfig },
  ],
};
