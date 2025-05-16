import { DOCUMENT } from "@angular/common";
import { Directive, HostListener, inject, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

/**
 * @desc Directive to scroll to a specific fragment on the page when clicked.
 *
 * TODO: Deprecate it and use `RouterLink` instead after ZonelessChangeDetection got stable.
 * @example
 * <a [scroll]="'targetElementId'">Scroll to Target</a>
 */
@Directive({
  selector: "[scroll]",
})
export class ScrollableDirective {
  readonly document = inject(DOCUMENT);
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);
  @Input("scroll") targetFragment = "";

  @HostListener("click")
  onClick() {
    if (this.targetFragment === "") {
      return;
    }

    this.router
      .navigate([], {
        fragment: this.targetFragment,
        relativeTo: this.activatedRoute,
      })
      .then(() =>
        this.document.getElementById(this.targetFragment)?.scrollIntoView({ behavior: "smooth" }),
      );
  }
}
