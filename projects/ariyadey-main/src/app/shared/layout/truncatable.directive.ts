import { DOCUMENT } from "@angular/common";
import {
  AfterViewInit,
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
  signal
} from "@angular/core";
import { I18nService } from "ariyadey-main/src/app/shared/i18n/i18n.service";
import { timer } from "rxjs";

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
    this.initialMaxHeight = this.window
      .getComputedStyle(this.element)
      .getPropertyValue("max-height");
    this.applyModifications();
  }

  ngOnDestroy() {
    this.renderer.removeChild(this.element, this.expandButton);
    this.renderer.removeChild(this.element, this.truncateButton);
  }

  @HostListener("window:resize")
  onResize() {
    timer(500).subscribe(() => this.applyModifications());
  }

  private setUpBtn(button: HTMLButtonElement, buttonTextKey: string) {
    const buttonText = this.i18nService.translate(buttonTextKey);
    this.renderer.setProperty(button, "textContent", buttonText);
    this.renderer.addClass(button, "more-less-btn");
    this.renderer.setStyle(button, "display", "none");
    this.renderer.appendChild(this.element, button);
  }

  /**
   * @description Checks if the element's content overflows the specified maxHeight
   * and sets up truncation/expansion.
   * This method is called on initialization, and the window resizes.
   */
  private applyModifications() {
    this.expand(this.element);
    if (this.initialMaxHeight == null || this.initialMaxHeight === "none") {
      console.warn("TruncatableDirective: max-height is not set.");
      return;
    }
    timer(0).subscribe(() => {
      const numericMaxHeight = parseFloat(this.initialMaxHeight);
      this.shouldTruncate.set(numericMaxHeight > 0 && this.element.scrollHeight > numericMaxHeight);
    });
  }

  /**
   * Truncates the text and sets the truncation styles based on the initial max height.
   * @param element The host HTMLElement.
   */
  private truncate(element: HTMLElement) {
    this.renderer.setStyle(element, "position", "relative");
    this.renderer.setStyle(element, "max-height", this.initialMaxHeight);
    this.renderer.setStyle(element, "overflow", "hidden");
    this.renderer.setStyle(this.truncateButton, "display", "none");
    this.renderer.removeStyle(this.expandButton, "display");
  }

  /**
   * Expands the text and removes the truncation styles.
   * @param element The host HTMLElement.
   */
  private expand(element: HTMLElement) {
    this.renderer.setStyle(element, "max-height", "unset");
    this.renderer.removeStyle(element, "overflow");
    this.renderer.setStyle(this.expandButton, "display", "none");
    if (this.reTruncate()) {
      this.renderer.removeStyle(this.truncateButton, "display");
    }
  }
}
