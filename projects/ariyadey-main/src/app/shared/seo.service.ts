import { DOCUMENT } from "@angular/common";
import { inject, Injectable, RendererFactory2 } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Meta, Title } from "@angular/platform-browser";
import { SUPPORTED_LANGUAGES } from "@main/shared/i18n/i18n.config";
import { I18nService } from "@main/shared/i18n/i18n.service";
import { Language } from "@main/shared/i18n/language";
import { RouteUtils } from "@main/shared/resource/route-utils";
import { UrlUtils } from "@main/shared/resource/url-utils";
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
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18nService = inject(I18nService);
  private readonly routeUtils = inject(RouteUtils);
  private readonly urlUtils = inject(UrlUtils);

  initSearchEngineOptimization() {
    this.setTitleAndDescription();
    this.setOpenGraphTags();
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

  private setTitleAndDescription() {
    this.title.setTitle(this.i18nService.translate("seo.title"));
    this.meta.addTag({
      name: "description",
      content: this.i18nService.translate("seo.description"),
    });
  }

  private setOpenGraphTags() {
    this.meta.addTags([
      {
        property: "og:title",
        content: this.i18nService.translate("seo.open-graph.title"),
      },
      {
        property: "og:description",
        content: this.i18nService.translate("seo.open-graph.description"),
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: this.urlUtils.getAbsoluteUrl(this.i18nService.getActiveLanguage()),
      },
      {
        property: "og:image",
        content: this.urlUtils.getAssetAbsoluteUrl(this.urlUtils.getImagePath("avatar-1000w.avif")),
      },
      {
        property: "og:image:width",
        content: "1000",
      },
      {
        property: "og:image:height",
        content: "1000",
      },
      {
        property: "og:image:alt",
        content: this.i18nService.translate("seo.open-graph.image.alt"),
      },
    ]);
  }

  private setCanonicalTag(lang: Language, ...paths: ReadonlyArray<string>) {
    this.removeCanonicalTag();
    const link = this.renderer.createElement("link") as HTMLLinkElement;
    this.renderer.setAttribute(link, "rel", "canonical");
    this.renderer.setAttribute(link, "href", this.urlUtils.getAbsoluteUrl(lang, ...paths));
    this.renderer.appendChild(this.document.head, link);
  }

  private setStaticHrefLangTag() {
    const link = this.renderer.createElement("link") as HTMLLinkElement;
    this.renderer.setAttribute(link, "rel", "alternate");
    this.renderer.setAttribute(link, "hreflang", "x-default");
    this.renderer.setAttribute(link, "href", this.urlUtils.getAbsoluteUrl(Language.ENGLISH));
    this.renderer.appendChild(this.document.head, link);
  }

  private setDynamicHreflangTags(...paths: ReadonlyArray<string>): void {
    this.removeAllDynamicHreflangTags();
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const link = this.renderer.createElement("link") as HTMLLinkElement;
      this.renderer.setAttribute(link, "rel", "alternate");
      this.renderer.setAttribute(link, "hreflang", lang);
      this.renderer.setAttribute(link, "href", this.urlUtils.getAbsoluteUrl(lang, ...paths));
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
}
