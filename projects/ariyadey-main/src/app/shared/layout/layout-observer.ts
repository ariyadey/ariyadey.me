import { BreakpointObserver } from "@angular/cdk/layout";
import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { combineLatest, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LayoutObserver {
  private readonly breakPointObserver = inject(BreakpointObserver);
  private readonly _breakpoint = toSignal<Layout, Layout>(
    combineLatest<Record<keyof Layout, Observable<boolean>>>({
      xs: this.breakPointObserver.observe("(min-width: 0px)").pipe(map((result) => result.matches)),
      sm: this.breakPointObserver
        .observe("(min-width: 600px)")
        .pipe(map((result) => result.matches)),
      md: this.breakPointObserver
        .observe("(min-width: 960px)")
        .pipe(map((result) => result.matches)),
      lg: this.breakPointObserver
        .observe("(min-width: 1280px)")
        .pipe(map((result) => result.matches)),
    }),
    { initialValue: { xs: false, sm: false, md: false, lg: false } },
  );

  get breakpoint() {
    return this._breakpoint;
  }
}

export type Layout = Readonly<{
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
}>;
