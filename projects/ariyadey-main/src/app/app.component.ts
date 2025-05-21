import { CdkMenu, CdkMenuItem } from "@angular/cdk/menu";
import { NgTemplateOutlet } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from "@angular/material/list";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { HomeComponent } from "@main/components/home/home.component";
import { MENU } from "@main/menu-item";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { I18nService } from "@main/shared/i18n/i18n.service";
import { Language } from "@main/shared/i18n/language";
import { LayoutService } from "@main/shared/layout/layout.service";
import { ScrollableDirective } from "@main/shared/layout/scrollable.directive";
import { Theme } from "@main/shared/theming/theme";
import { ThemeService } from "@main/shared/theming/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: ``,
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
    HomeComponent,
    ScrollableDirective,
    MatDivider,
    CdkMenu,
    CdkMenuItem,
    NgTemplateOutlet,
    MatToolbarRow,
  ],
})
export class AppComponent {
  readonly i18nService = inject(I18nService);
  readonly themeService = inject(ThemeService);
  readonly layout = inject(LayoutService).layout;
  readonly alternativeLanguage = this.i18nService
    .getAvailableLanguages()
    .find((language) => language !== this.i18nService.getActiveLanguage());
  readonly currentThemeVariant = computed(() => this.themeService.currentTheme().variant);
  readonly menu = computed(() =>
    this.layout().md ? MENU.filter((item) => item.titleKey !== "contact") : MENU,
  );

  switchLanguage(language: Language) {
    this.i18nService.switchLanguage(language);
  }

  switchThemeVariant(variant: Theme["variant"]) {
    this.themeService.switchThemeVariant(variant);
  }
}
