import { DOCUMENT } from "@angular/common";
import {
  effect,
  inject,
  Injectable,
  RendererFactory2,
  signal,
  WritableSignal,
} from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { LocalStorageService } from "@main/shared/persistance/local-storage.service";
import { PersistKey } from "@main/shared/persistance/persist-key";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly _currentTheme: WritableSignal<Theme>;

  constructor() {
    this._currentTheme = signal(
      (this.localStorageService.get(PersistKey.THEME) as Theme) ?? DEFAULT_THEME,
    );
    effect(() => this.onThemeChange());
    this.setUpMatIconRegistry();
  }

  get currentTheme() {
    return this._currentTheme.asReadonly();
  }

  switchThemeVariant(variant?: Theme["variant"]) {
    this._currentTheme.set({ ...this._currentTheme(), variant: variant ?? DEFAULT_THEME.variant });
  }

  private onThemeChange() {
    const previousTheme = this.localStorageService.get(PersistKey.THEME) as Theme | null;
    if (previousTheme != null) {
      this.renderer.removeClass(
        this.document.body,
        `${previousTheme.name}-${previousTheme.variant}-theme`,
      );
    }
    this.localStorageService.set(PersistKey.THEME, this._currentTheme());
    if (this._currentTheme().variant !== "AUTO") {
      this.renderer.addClass(
        this.document.body,
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
  }
}

export type Theme = Readonly<{
  name: "DEFAULT";
  variant: "AUTO" | "LIGHT" | "DARK";
}>;

const DEFAULT_THEME: Theme = {
  name: "DEFAULT",
  variant: "AUTO",
};
