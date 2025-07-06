import {
  AfterViewInit,
  booleanAttribute,
  DestroyRef,
  Directive,
  DOCUMENT,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
  signal
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { I18nService } from "@main/shared/i18n/i18n.service";
import { fromEvent, startWith, throttleTime } from "rxjs";

/**
 * @desc
 * The `TruncatableDirective` is an Angular directive that allows truncating and expanding
 * the content of an HTML element based on its height. It dynamically adds "Expand" and "Truncate"
 * buttons to toggle between the two states.
 *
 * @example
 * <div truncate [expandTextKey]="'action.expand'" [truncateTextKey]="'action.truncate'" [reTruncate]="true">
 *   Long content here...
 * </div>
 *
 * @selector [truncate]
 *
 * @author Ariya Moheb
 */
@Directive({
  selector: "[truncate]",
})
export class TruncatableDirective implements OnInit, AfterViewInit, OnDestroy {
  readonly expandTextKey = input("action.truncate.undo");
  readonly truncateTextKey = input("action.truncate.do");
  readonly reTruncate = input(true, { transform: booleanAttribute });
  readonly window = inject(DOCUMENT).defaultView!;
  readonly renderer = inject(Renderer2);
  readonly element = inject(ElementRef).nativeElement as HTMLElement;
  readonly i18nService = inject(I18nService);
  readonly destroyRef = inject(DestroyRef);
  readonly expandButton = this.renderer.createElement("button") as HTMLButtonElement;
  readonly truncateButton = this.renderer.createElement("button") as HTMLButtonElement;
  readonly shouldTruncate = signal(false);
  private initialMaxHeight!: string;

  constructor() {
    effect(() => {
      if (this.shouldTruncate() != null && this.initialMaxHeight == null) {
        return;
      }
      this.shouldTruncate() ? this.truncate(this.element) : this.expand(this.element);
    });
  }

  ngOnInit() {
    this.setUpBtn(this.expandButton, this.expandTextKey());
    this.renderer.listen(this.expandButton, "click", () => {
      this.shouldTruncate.set(false);
    });
    if (this.reTruncate()) {
      this.setUpBtn(this.truncateButton, this.truncateTextKey());
      this.renderer.listen(this.truncateButton, "click", () => {
        this.shouldTruncate.set(true);
      });
    }
  }

  ngAfterViewInit() {
    // FIXME: 06/07/2025 Switching from mobile to desktop does not change the computed max-height.
    fromEvent(this.window, "resize")
      .pipe(startWith(null), throttleTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe((_) => {
        this.initialMaxHeight = this.window.getComputedStyle(this.element).maxHeight;
        this.applyModifications();
      });
  }

  ngOnDestroy() {
    this.renderer.removeChild(this.element, this.expandButton);
    this.renderer.removeChild(this.element, this.truncateButton);
  }

  private setUpBtn(button: HTMLButtonElement, buttonTextKey: string) {
    const buttonText = this.i18nService.translate(buttonTextKey);
    this.renderer.setProperty(button, "textContent", buttonText);
    this.renderer.addClass(button, "more-less-btn");
    this.renderer.addClass(button, "hidden-btn");
    this.renderer.appendChild(this.element, button);
  }

  /**
   * @description Checks if the element's content overflows the specified maxHeight
   * and sets up truncation/expansion.
   * This method is called on initialization, and the window resizes.
   */
  private applyModifications() {
    if (this.initialMaxHeight == null || this.initialMaxHeight === "none") {
      console.warn("TruncatableDirective: max-height is not set.");
      return;
    }
    const numericMaxHeight = parseFloat(this.initialMaxHeight);
    this.shouldTruncate.set(numericMaxHeight > 0 && this.element.scrollHeight > numericMaxHeight);
  }

  /**
   * Truncates the text and sets the truncation styles based on the initial max height.
   * @param element The host HTMLElement.
   */
  private truncate(element: HTMLElement) {
    this.renderer.addClass(element, "truncated");
    this.renderer.removeClass(element, "expanded");
    this.renderer.setStyle(element, "max-height", this.initialMaxHeight);

    this.renderer.addClass(this.expandButton, "visible-btn");
    this.renderer.removeClass(this.expandButton, "hidden-btn");

    this.renderer.addClass(this.truncateButton, "hidden-btn");
    this.renderer.removeClass(this.truncateButton, "visible-btn");
  }

  /**
   * Expands the text and removes the truncation styles.
   * @param element The host HTMLElement.
   */
  private expand(element: HTMLElement) {
    this.renderer.addClass(element, "expanded");
    this.renderer.removeClass(element, "truncated");
    this.renderer.removeStyle(element, "max-height");

    this.renderer.addClass(this.expandButton, "hidden-btn");
    this.renderer.removeClass(this.expandButton, "visible-btn");

    if (this.reTruncate()) {
      this.renderer.addClass(this.truncateButton, "visible-btn");
      this.renderer.removeClass(this.truncateButton, "hidden-btn");
    }
  }
}
