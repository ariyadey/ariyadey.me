import { CdkMenu, CdkMenuItem } from "@angular/cdk/menu";
import { NgTemplateOutlet } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { MatAnchor, MatButton, MatIconButton } from "@angular/material/button";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from "@angular/material/list";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MENU } from "@main/menu-item";
import { BackToTopComponent } from "@main/shared/components/back-to-top/back-to-top.component";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { I18nService } from "@main/shared/i18n/i18n.service";
import { Language } from "@main/shared/i18n/language";
import { LayoutObserver } from "@main/shared/layout/layout-observer";
import { ScrollableDirective } from "@main/shared/layout/scrollable.directive";
import { SeoService } from "@main/shared/seo.service";
import { Theme } from "@main/shared/theming/theme";
import { ThemeService } from "@main/shared/theming/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: `
    .desktop-menu-item {
      @apply [--mat-button-text-container-height:60px];
      @apply [--mat-button-text-container-shape:var(--mat-sys-corner-medium)];
      @apply [--mat-button-text-label-text-color:var(--mat-sys-on-surface-variant)];
      @apply [--mat-button-text-state-layer-color:var(--mat-sys-on-surface-variant)];
    }
  `,
  imports: [
    MatSidenavContainer,
    MatToolbar,
    MatIcon,
    MatNavList,
    RouterLink,
    MatSidenav,
    MatSidenavContent,
    MatIconButton,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    I18nPipe,
    ScrollableDirective,
    MatDivider,
    CdkMenu,
    CdkMenuItem,
    NgTemplateOutlet,
    MatToolbarRow,
    MatAnchor,
    RouterOutlet,
    BackToTopComponent,
  ],
})
export class AppComponent {
  readonly i18nService = inject(I18nService);
  readonly themeService = inject(ThemeService);
  readonly breakpoint = inject(LayoutObserver).breakpoint;
  readonly alternativeLanguage = this.i18nService
    .getAvailableLanguages()
    .find((language) => language !== this.i18nService.getActiveLanguage());
  readonly currentThemeVariant = computed(() => this.themeService.currentTheme().variant);
  readonly menu = computed(() =>
    this.breakpoint().md ? MENU.filter((item) => item.titleKey !== "contact") : MENU,
  );

  constructor() {
    inject(SeoService).initSearchEngineOptimization();
  }

  switchLanguage(language: Language) {
    this.i18nService.switchLanguage(language);
  }

  switchThemeVariant(variant: Theme["variant"]) {
    this.themeService.switchThemeVariant(variant);
  }
}
