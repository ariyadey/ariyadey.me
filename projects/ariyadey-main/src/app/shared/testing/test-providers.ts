import { APP_BASE_HREF } from "@angular/common";
import { EnvironmentProviders, Injectable, Provider } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { FakeMatIconRegistry } from "@angular/material/icon/testing";
import { provideRouter } from "@angular/router";
import { provideTransloco, Translation, TranslocoLoader } from "@jsverse/transloco";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@main/shared/i18n/i18n.config";
import { Observable, of } from "rxjs";

@Injectable()
class InMemoryTranslocoLoader implements TranslocoLoader {
  getTranslation(): Observable<Translation> {
    return of({});
  }
}

export function provideAppTesting(): Array<Provider | EnvironmentProviders> {
  return [
    { provide: APP_BASE_HREF, useValue: "/" },
    provideRouter([]),
    provideTransloco({
      config: {
        availableLangs: SUPPORTED_LANGUAGES,
        defaultLang: DEFAULT_LANGUAGE,
        missingHandler: {
          logMissingKey: false,
        },
        prodMode: false,
      },
      loader: InMemoryTranslocoLoader,
    }),
    { provide: MatIconRegistry, useClass: FakeMatIconRegistry },
  ];
}
