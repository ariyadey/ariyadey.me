import { inject } from "@angular/core";
import { Routes } from "@angular/router";
import { HomeComponent } from "@main/components/home/home.component";
import { SUPPORTED_LANGUAGES } from "@main/shared/i18n/i18n.config";
import { I18nService } from "@main/shared/i18n/i18n.service";
import { Language } from "@main/shared/i18n/language";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: (_) => inject(I18nService).getActiveLanguage(),
  },
  {
    matcher: (segments) =>
      SUPPORTED_LANGUAGES.includes(segments[0].path as Language)
        ? {
            consumed: [segments[0]],
            posParams: { lang: segments[0] },
          }
        : null,
    component: HomeComponent,
  },
  {
    path: "**",
    redirectTo: (_) => inject(I18nService).getActiveLanguage(),
  },
];
