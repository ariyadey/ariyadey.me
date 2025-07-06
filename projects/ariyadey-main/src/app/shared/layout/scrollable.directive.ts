import { Directive, DOCUMENT, HostListener, inject, input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

/**
 * @desc Directive to scroll to a specific fragment on the page when clicked.
 *
 * TODO: Deprecate it and use `RouterLink` after this issue resolves: https://github.com/angular/components/issues/4280
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
  readonly targetFragment = input("", { alias: "scroll" });

  @HostListener("click")
  onClick() {
    if (this.targetFragment() === "") {
      return;
    }

    this.router
      .navigate([], {
        fragment: this.targetFragment(),
        relativeTo: this.activatedRoute,
      })
      .then(() =>
        this.document.getElementById(this.targetFragment())?.scrollIntoView({ behavior: "smooth" }),
      );
  }
}
