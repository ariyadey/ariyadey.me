import { inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";

/**
 * A utility service for navigating and retrieving information about activated routes.
 * It provides an observable to easily get the deepest primary ActivatedRoute
 * whenever a navigation event successfully completes.
 *
 * @author Ariya Moheb
 */
@Injectable({
  providedIn: "root",
})
export class RouteUtils {
  private readonly rootRoute = inject(ActivatedRoute);
  /**
   * An observable that emits the deepest primary `ActivatedRoute` whenever a
   * successful navigation (`NavigationEnd` event) occurs.
   *
   * This is useful for scenarios where you need to access route data, parameters,
   * or resolve data specific to the final, loaded component in the primary outlet.
   *
   * The observable automatically unsubscribes when the service is destroyed,
   * thanks to `takeUntilDestroyed()`.
   */
  readonly deepestPrimaryRouteChange$ = inject(Router).events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((_) => this.getDeepestPrimaryRoute(this.rootRoute)),
    takeUntilDestroyed(),
  );

  /**
   * Recursively traverses the ActivatedRoute tree to find the deepest `ActivatedRoute`
   * that belongs to the primary outlet.
   *
   * This is crucial for handling complex routing scenarios with nested routes or
   * auxiliary outlets, ensuring you always get the route associated with the main content.
   *
   * @param route The starting ActivatedRoute to begin the traversal from.
   * @returns The deepest `ActivatedRoute` within the primary outlet.
   * @throws {Error} If an unexpected non-primary outlet is encountered when traversing children.
   */
  private getDeepestPrimaryRoute(route: ActivatedRoute): ActivatedRoute {
    if (route.outlet !== "primary") {
      throw new Error("Faced unexpected route outlet when traversing to deepest child");
    }
    if (route.children.length === 0) {
      return route;
    }
    if (route.children.every((child) => child.outlet !== "primary")) {
      return route;
    }
    const primaryChildRoute = route.children.find((child) => child.outlet === "primary")!;
    return this.getDeepestPrimaryRoute(primaryChildRoute);
  }
}
