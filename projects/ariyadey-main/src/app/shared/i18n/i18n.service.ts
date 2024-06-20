import { Direction } from "@angular/cdk/bidi";
import { DOCUMENT } from "@angular/common";
import { effect, inject, Injectable, RendererFactory2, signal } from "@angular/core";
import { getBrowserLang, TranslocoService } from "@jsverse/transloco";
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
  private readonly _activeLanguage;

  constructor() {
    this._activeLanguage = signal(
      (this.localStorageService.get(PersistKey.LANGUAGE) ??
        getBrowserLang() ??
        this.translator.getDefaultLang()) as Language,
    );
    effect(() => this.onLanguageChange());
  }

  get activeLanguage() {
    return this._activeLanguage.asReadonly();
  }

  getAvailableLanguages() {
    return this.translator.getAvailableLangs() as ReadonlyArray<Language>;
  }

  switchLanguage(language: Language) {
    this._activeLanguage.set(language);
  }

  translate(key: string, options?: Partial<{ params: ReadonlyArray<string>; language: Language }>) {
    return this.translator.translate(key, options?.params, options?.language);
  }

  private onLanguageChange() {
    this.localStorageService.set(PersistKey.LANGUAGE, this._activeLanguage());
    this.translator.setActiveLang(this._activeLanguage());
    this.renderer.setAttribute(
      this.document.documentElement,
      "dir",
      LanguageDirection[this._activeLanguage()],
    );
  }
}

export type Language = "en" | "fa";

const LanguageDirection: Readonly<Record<Language, Direction>> = {
  en: "ltr",
  fa: "rtl",
};
