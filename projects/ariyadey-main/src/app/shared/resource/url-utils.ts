import { APP_BASE_HREF } from "@angular/common";
import { DOCUMENT, inject, Injectable } from "@angular/core";
import { SUPPORTED_LANGUAGES } from "@main/shared/i18n/i18n.config";
import { Language } from "@main/shared/i18n/language";

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
  private readonly baseUrl = [this.document.location.origin]
    .concat(inject(APP_BASE_HREF).split("/"))
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
   * Constructs an absolute URL based on the base URL, language, and path segments.
   * Handles trailing slashes for directory-like paths.
   * @param lang The language segment of the URL.
   * @param paths The path segments following the language segment.
   * @returns The fully constructed absolute URL.
   */
  getAbsoluteUrl(lang: Language, paths = [] as ReadonlyArray<string>) {
    return `${this.baseUrl}/${lang}/${paths.join("/")}${paths.length > 0 ? "/" : ""}`;
  }
}
