import { NgClass } from "@angular/common";
import {
  AfterViewInit,
  Component,
  DestroyRef,
  DOCUMENT,
  inject,
  input,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { auditTime, distinctUntilChanged, fromEvent, map } from "rxjs";

@Component({
  selector: "app-back-to-top",
  templateUrl: "./back-to-top.component.html",
  styles: `
    .wrapper {
      transition:
        opacity 0.3s ease-in-out,
        visibility 0.3s ease-in-out,
        transform 0.2s ease-out;
    }
  `,
  imports: [MatButtonModule, MatIconModule, NgClass],
})
export class BackToTopComponent implements AfterViewInit {
  readonly SCROLLABLE_SELECTOR = "mat-sidenav-content";
  readonly document = inject(DOCUMENT);
  readonly router = inject(Router);
  readonly destroyRef = inject(DestroyRef);
  readonly scrollThresholdPx = input(250);
  readonly showButton = signal(false);
  scrollContainer?: Element;

  ngAfterViewInit() {
    this.scrollContainer = this.document.querySelector(this.SCROLLABLE_SELECTOR) ?? undefined;
    if (!this.scrollContainer) {
      return;
    }

    fromEvent(this.scrollContainer, "scroll")
      .pipe(
        auditTime(250),
        map((event) => (event.target as Element).scrollTop),
        map((scrollPx) => scrollPx > this.scrollThresholdPx()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((visible) => this.showButton.set(visible));
  }

  scrollToTop() {
    this.router.navigateByUrl(this.router.url.split("#")[0]);
    this.scrollContainer?.scrollTo({ top: 0, behavior: "smooth" });
  }
}
