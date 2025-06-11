import { APP_BASE_HREF } from "@angular/common";
import { DOCUMENT, inject, Injectable } from "@angular/core";
import { SUPPORTED_LANGUAGES } from "@main/shared/i18n/i18n.config";
import { Language } from "@main/shared/i18n/language";
import { APP_DOMAIN } from "ariyadey-main/src/main";

/**
 * A utility service for extracting language and path information from the current URL.
 * This is particularly useful in multi-language Angular applications where the language segment
 * is part of the URL path.
 *
 * @author Ariya Moheb
 */
@Injectable({
  providedIn: "root",
})
export class UrlUtils {
  private readonly document = inject(DOCUMENT);
  private readonly baseUrl = [`https://${APP_DOMAIN}`, ...inject(APP_BASE_HREF).split("/")]
    .filter((string) => string.length > 0)
    .join("/");

  /**
   * Retrieves the language segment from the current URL's pathname.
   * It checks the second segment of the path (e.g., `/en/about` -> 'en')
   * against the list of `SUPPORTED_LANGUAGES`.
   *
   * @returns The identified language string (e.g., 'en', 'fa'), or `undefined` if no supported language is found.
   */
  getCurrentUrlLanguage() {
    return SUPPORTED_LANGUAGES.find(
      (lang) => lang === this.document.location.pathname.split("/").at(1),
    );
  }

  /**
   * Extracts the path segments of the current URL, excluding the language segment.
   * This provides the part of the URL that identifies the specific page or resource,
   * independent of the language.
   *
   * For example, for a URL like `/en/products/123`, it would return `['products', '123']`.
   * For `/fa/about`, it would return `['about']`.
   *
   * @returns An array of strings representing the path segments without the language.
   */
  getCurrentNoLanguagePath() {
    return this.document.location.pathname.split("/").slice(2);
  }

  /**
   * Constructs a relative path for an image.
   * This is typically used for images loaded directly into HTML via src attributes
   * or within CSS, where a full absolute URL might not be necessary.
   * @param paths - A readonly array of string segments forming the image path.
   * @returns The relative image path (e.g., 'img/category/logo.png').
   */
  getImagePath(...paths: ReadonlyArray<string>) {
    return ["img", ...paths].filter((string) => string.length > 0).join("/");
  }

  /**
   * Constructs a full absolute URL for a specific page within the application.
   * This is essential for SEO purposes (e.g., canonical tags, hreflang, Open Graph `og:url`).
   * It includes the base domain, language segment, and all provided path segments.
   * Handles trailing slashes for directory-like paths.
   * @param lang The language segment of the URL (e.g., 'en', 'fa').
   * @param paths The path segments following the language segment (e.g., ['about'], ['projects', 'my-app']).
   * @returns The fully constructed absolute URL (e.g., 'https://ariyadey.me/en/about/').
   */
  getAbsoluteUrl(lang?: Language, ...paths: ReadonlyArray<string>) {
    return [this.baseUrl, lang ?? "", ...paths].filter((string) => string.length > 0).join("/");
  }

  /**
   * Constructs a full absolute URL for an asset (e.g., images, fonts, documents)
   * that resides in the application's asset directory.
   * This is particularly useful for Open Graph `og:image` and Twitter Card `twitter:image` tags,
   * where absolute URLs are required for proper rendering on social media platforms.
   * @param paths - A readonly array of string segments forming the asset path (e.g., ['assets', 'images', 'hero.jpg']).
   * @returns The fully constructed absolute URL to the asset (e.g., 'https://ariyadey.me/assets/images/hero.jpg').
   * @throws Error if no path segments are provided.
   */
  getAssetAbsoluteUrl(...paths: ReadonlyArray<string>) {
    if (paths.length === 0) {
      throw new Error("The path must not be empty");
    }
    return [this.baseUrl, ...paths].filter((string) => string.length > 0).join("/");
  }
}
