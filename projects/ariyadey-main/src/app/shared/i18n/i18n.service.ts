import { DOCUMENT, inject, Injectable, RendererFactory2 } from "@angular/core";
import { getBrowserLang, TranslocoService } from "@jsverse/transloco";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@main/shared/i18n/i18n.config";
import { Language, LANGUAGE_DIRECTION_MAP } from "@main/shared/i18n/language";
import { LocalStorage } from "@main/shared/persistance/local-storage";
import { PersistKey } from "@main/shared/persistance/persist-key";
import { UrlUtils } from "@main/shared/resource/url-utils";

@Injectable({
  providedIn: "root",
})
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly translator = inject(TranslocoService);
  private readonly localStorage = inject(LocalStorage);
  private readonly urlUtils = inject(UrlUtils);
  private readonly language = this.getInitialLanguage();

  constructor() {
    this.localStorage.set(PersistKey.LANGUAGE, this.language);
    this.translator.setActiveLang(this.language);
    this.renderer.setAttribute(this.document.documentElement, "lang", this.language);
    this.renderer.setAttribute(
      this.document.documentElement,
      "dir",
      LANGUAGE_DIRECTION_MAP[this.language],
    );
  }

  initialize() {
    return this.translator.load(this.language);
  }

  getActiveLanguage() {
    return this.language;
  }

  getActiveLocale() {
    return this.getActiveLanguage();
  }

  getAvailableLanguages() {
    return this.translator.getAvailableLangs() as ReadonlyArray<Language>;
  }

  switchLanguage(language: Language) {
    this.document.location.assign(
      [language, ...this.urlUtils.getCurrentNoLanguagePath()].join("/"),
    );
  }

  translate(
    key: string,
    options?: Partial<{ params: Record<string, unknown>; language: Language }>,
  ) {
    return this.translator.translate(key, options?.params, options?.language);
  }

  private getInitialLanguage(): Language {
    const urlLanguage = this.urlUtils.getCurrentUrlLanguage();
    const storageLanguage = this.localStorage.get<Language>(PersistKey.LANGUAGE);
    const browserLanguage = SUPPORTED_LANGUAGES.find((lang) => lang === getBrowserLang());
    return urlLanguage ?? storageLanguage ?? browserLanguage ?? DEFAULT_LANGUAGE;
  }
}
