import { Component, computed, inject, signal } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from "@angular/material/list";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { I18nService, Language } from "@main/shared/i18n/i18n.service";
import { Theme, ThemeService } from "@main/shared/theming/theme.service";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
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
  ],
})
export class AppComponent {
  readonly i18nService = inject(I18nService);
  readonly themeService = inject(ThemeService);
  // readonly breakpointObserver = inject(BreakpointObserver);
  readonly alternativeLanguage = computed(() => this.getAlternativeLanguage());
  readonly currentThemeVariant = computed(() => this.themeService.currentTheme().variant);
  readonly menu = signal(MENU).asReadonly();
  // readonly isHandset = toSignal(
  //   this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
  //     map((result) => result.matches),
  //     shareReplay(),
  //   ),
  // );

  switchLanguage(language: Language) {
    this.i18nService.switchLanguage(language);
  }

  switchThemeVariant(variant: Theme["variant"]) {
    this.themeService.switchThemeVariant(variant);
  }

  private getAlternativeLanguage() {
    return this.i18nService
      .getAvailableLanguages()
      .filter((language) => language !== this.i18nService.activeLanguage())
      .map(
        (language) =>
          [
            language,
            this.i18nService.translate(`language.${language}`, { language: language }),
          ] as [Language, string],
      )[0];
  }
}

const MENU = [
  { iconName: "home", title: "home", link: "" },
  { iconName: "pages", title: "blog", link: "blog" },
];
