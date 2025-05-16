import { DOCUMENT } from "@angular/common";
import { inject, Injectable, RendererFactory2 } from "@angular/core";
import { getBrowserLang, TranslocoService } from "@jsverse/transloco";
import { Language, LanguageDirection } from "@main/shared/i18n/language";
import { LocalStorageService } from "@main/shared/persistance/local-storage.service";
import { PersistKey } from "@main/shared/persistance/persist-key";

@Injectable({
  providedIn: "root",
})
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly translator = inject(TranslocoService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly language = this.getInitialLanguage();

  constructor() {
    this.localStorageService.set(PersistKey.LANGUAGE, this.language);
    this.translator.setActiveLang(this.language);
    this.renderer.setAttribute(
      this.document.documentElement,
      "dir",
      LanguageDirection[this.language],
    );
  }

  getActiveLanguage() {
    return this.language;
  }

  getAvailableLanguages() {
    return this.translator.getAvailableLangs() as ReadonlyArray<Language>;
  }

  switchLanguage(language: Language) {
    this.localStorageService.set(PersistKey.LANGUAGE, language);
    this.document.location.reload();
  }

  translate(
    key: string,
    options?: Partial<{ params: Record<string, unknown>; language: Language }>,
  ) {
    return this.translator.translate(key, options?.params, options?.language);
  }

  private getInitialLanguage(): Language {
    const browserLang = getBrowserLang() as Language;
    return (
      this.localStorageService.get<Language>(PersistKey.LANGUAGE) ??
      (Object.values(Language).includes(browserLang)
        ? browserLang
        : (this.translator.getDefaultLang() as Language))
    );
  }
}
