import { AsyncPipe, NgClass } from "@angular/common";
import { AfterViewInit, Component, DestroyRef, DOCUMENT, inject, input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { auditTime, distinctUntilChanged, fromEvent, map, Observable } from "rxjs";

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
  imports: [MatButtonModule, MatIconModule, AsyncPipe, NgClass],
})
export class BackToTopComponent implements AfterViewInit {
  readonly SCROLLABLE_SELECTOR = "mat-sidenav-content";
  readonly document = inject(DOCUMENT);
  readonly router = inject(Router);
  readonly destroyRef = inject(DestroyRef);
  readonly scrollThresholdPx = input(250);
  scrollContainer?: Element;
  showButton$?: Observable<boolean>;

  ngAfterViewInit() {
    this.scrollContainer = this.document.querySelector(this.SCROLLABLE_SELECTOR)!;
    this.showButton$ = fromEvent(this.scrollContainer!, "scroll").pipe(
      auditTime(250),
      map((event) => (event.target as Element).scrollTop),
      map((scrollPx) => scrollPx > this.scrollThresholdPx()),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  scrollToTop() {
    this.router.navigateByUrl(this.router.url.split("#")[0]);
    this.scrollContainer!.scrollTo({ top: 0, behavior: "smooth" });
  }
}
