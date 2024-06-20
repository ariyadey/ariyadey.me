import { Directionality } from "@angular/cdk/bidi";
import { Directive, ElementRef, inject, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "mat-icon[appDirectional]",
  standalone: true,
})
export class DirectionalDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly directionality = inject(Directionality);

  ngOnInit() {
    this.directionality.value === "ltr"
      ? this.renderer.removeClass(this.elementRef.nativeElement, "mat-icon-rtl-mirror")
      : this.renderer.addClass(this.elementRef.nativeElement, "mat-icon-rtl-mirror");
  }
}
