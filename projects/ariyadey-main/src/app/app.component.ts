import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe, DOCUMENT } from "@angular/common";
import { Component, inject, Renderer2, Signal, signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon, MatIconRegistry } from "@angular/material/icon";
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from "@angular/material/list";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatToolbar,
    MatSidenavContent,
    RouterLink,
    RouterLinkActive,
    MatListItemIcon,
    MatListItemTitle,
    MatButton,
  ],
  templateUrl: "./app.component.html",
  styles: ``,
})
export class AppComponent {
  breakpointObserver = inject(BreakpointObserver);
  matIconRegistry = inject(MatIconRegistry);
  renderer = inject(Renderer2);
  document = inject(DOCUMENT);
  currentTheme: WritableSignal<"light" | "dark"> = signal("light");
  menu: Signal<Array<MenuItem>> = signal([
    { iconName: "home", title: "Home", link: "" },
    { iconName: "pages", title: "Blog", link: "blog" },
  ]).asReadonly();
  focusedMenuItemIndex = signal(Number.NaN);
  isHandset = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map((result) => result.matches),
      shareReplay(),
    ),
  );

  constructor() {
    this.setUpMatIconRegistry();
    this.enableLightTheme();
  }

  setFocusedIndex(index: number) {
    this.focusedMenuItemIndex.set(index);
  }

  clearFocusedIndex() {
    this.focusedMenuItemIndex.set(Number.NaN);
  }

  enableLightTheme() {
    this.renderer.addClass(this.document.body, "light-theme");
    this.renderer.removeClass(this.document.body, "dark-theme");
    this.currentTheme.set("light");
  }

  enableDarkTheme() {
    this.renderer.addClass(this.document.body, "dark-theme");
    this.renderer.removeClass(this.document.body, "light-theme");
    this.currentTheme.set("dark");
  }

  private setUpMatIconRegistry() {
    this.matIconRegistry.setDefaultFontSetClass("mat-ligature-font", "material-icons-outlined");
    this.matIconRegistry.registerFontClassAlias(
      "default-fs",
      "mat-ligature-font material-icons-outlined",
    );
    this.matIconRegistry.registerFontClassAlias(
      "alternative-fs",
      "mat-ligature-font material-icons",
    );
  }
}

type MenuItem = Readonly<{
  iconName: string;
  title: string;
  link: string;
}>;
