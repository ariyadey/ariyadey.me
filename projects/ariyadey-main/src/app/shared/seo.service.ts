import { APP_BASE_HREF, DOCUMENT } from "@angular/common";
import { inject, Injectable, RendererFactory2 } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SUPPORTED_LANGUAGES } from "@main/shared/i18n/i18n.config";
import { Language } from "@main/shared/i18n/language";
import { RouteUtils } from "@main/shared/resource/route-utils";
import { exhaustMap, filter, map } from "rxjs";

/**
 * Service responsible for managing Search Engine Optimization (SEO) aspects
 * of the Angular application, including dynamic hreflang and canonical tags.
 * It observes route changes to update SEO metadata relevant to the current page.
 *
 * @author Ariya Moheb
 */
@Injectable({
  providedIn: "root",
})
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly routeUtils = inject(RouteUtils);
  private readonly baseUrl = [this.document.location.origin]
    .concat(inject(APP_BASE_HREF).split("/"))
    .filter((string) => string.length > 0)
    .join("/");

  initSearchEngineOptimization() {
    this.setStaticHrefLangTag();
    this.routeUtils.deepestPrimaryRouteChange$
      .pipe(
        exhaustMap((route) => route.url),
        map((urlSegments) => urlSegments.map((urlSegment) => urlSegment.path)),
        filter((paths) => SUPPORTED_LANGUAGES.includes(paths.at(0) as Language)),
        takeUntilDestroyed(),
      )
      .subscribe((paths) => {
        this.setCanonicalTag(paths.at(0) as Language, ...paths.slice(1));
        this.setDynamicHreflangTags(...paths.slice(1));
      });
  }

  private setCanonicalTag(lang: Language, ...paths: ReadonlyArray<string>) {
    this.removeCanonicalTag();
    const link = this.renderer.createElement("link") as HTMLLinkElement;
    this.renderer.setAttribute(link, "rel", "canonical");
    this.renderer.setAttribute(link, "href", this.getAbsoluteUrl(lang, paths));
    this.renderer.appendChild(this.document.head, link);
  }

  private setStaticHrefLangTag() {
    const link = this.renderer.createElement("link") as HTMLLinkElement;
    this.renderer.setAttribute(link, "rel", "alternate");
    this.renderer.setAttribute(link, "hreflang", "x-default");
    this.renderer.setAttribute(link, "href", `${this.baseUrl}/${Language.ENGLISH}/`);
    this.renderer.appendChild(this.document.head, link);
  }

  private setDynamicHreflangTags(...paths: ReadonlyArray<string>): void {
    this.removeAllDynamicHreflangTags();
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const link = this.renderer.createElement("link") as HTMLLinkElement;
      this.renderer.setAttribute(link, "rel", "alternate");
      this.renderer.setAttribute(link, "hreflang", lang);
      this.renderer.setAttribute(
        link,
        "href",
        `${this.baseUrl}/${lang}/${paths.join("/")}${paths.length > 0 ? "/" : ""}`,
      );
      this.renderer.appendChild(this.document.head, link);
    });
  }

  private removeCanonicalTag() {
    const canonicalLink = this.document.querySelector("link[rel='canonical']");
    if (canonicalLink == null) {
      return;
    }
    this.renderer.removeChild(this.document.head, canonicalLink);
  }

  private removeAllDynamicHreflangTags() {
    this.document
      .querySelectorAll("link[rel='alternate'][hreflang]:not([hreflang='x-default'])")
      .forEach((link) => this.renderer.removeChild(this.document.head, link));
  }

  /**
   * Constructs an absolute URL based on the base URL, language, and path segments.
   * Handles trailing slashes for directory-like paths.
   * @param lang The language segment of the URL.
   * @param paths The path segments following the language segment.
   * @returns The fully constructed absolute URL.
   */
  private getAbsoluteUrl(lang: Language, paths: ReadonlyArray<string>) {
    return `${this.baseUrl}/${lang}/${paths.join("/")}${paths.length > 0 ? "/" : ""}`;
  }
}
