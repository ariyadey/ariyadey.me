import { DOCUMENT } from "@angular/common";
import { effect, inject, Injectable, RendererFactory2, signal } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { LocalStorageService } from "@main/shared/persistance/local-storage.service";
import { PersistKey } from "@main/shared/persistance/persist-key";
import { DEFAULT_THEME, Theme } from "@main/shared/theming/theme";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly _currentTheme = signal(
    this.localStorageService.get<Theme>(PersistKey.THEME) ?? DEFAULT_THEME,
  );

  constructor() {
    effect(() => this.onThemeChange());
    this.setUpMatIconRegistry();
  }

  get currentTheme() {
    return this._currentTheme.asReadonly();
  }

  switchThemeVariant(variant: Theme["variant"]) {
    this._currentTheme.set({ ...this._currentTheme(), variant });
  }

  private onThemeChange() {
    const previousTheme = this.localStorageService.get<Theme>(PersistKey.THEME);
    if (previousTheme != null) {
      this.renderer.removeClass(
        this.document.documentElement,
        `${previousTheme.name}-${previousTheme.variant}-theme`,
      );
    }
    this.localStorageService.set(PersistKey.THEME, this._currentTheme());
    if (this._currentTheme().variant !== "AUTO") {
      this.renderer.addClass(
        this.document.documentElement,
        `${this._currentTheme().name}-${this._currentTheme().variant}-theme`,
      );
    }
  }

  private setUpMatIconRegistry() {
    this.matIconRegistry.setDefaultFontSetClass("mat-ligature-font", "material-icons-outlined");
    this.matIconRegistry.registerFontClassAlias(
      "def-fs",
      "mat-ligature-font material-icons-outlined",
    );
    this.matIconRegistry.registerFontClassAlias("alt-fs", "mat-ligature-font material-icons");
    this.matIconRegistry.addSvgIconResolver((name, namespace) =>
      namespace.length > 0
        ? this.domSanitizer.bypassSecurityTrustResourceUrl(`icon/${namespace}/${name}.svg`)
        : this.domSanitizer.bypassSecurityTrustResourceUrl(`icon/${name}.svg`),
    );
  }
}
