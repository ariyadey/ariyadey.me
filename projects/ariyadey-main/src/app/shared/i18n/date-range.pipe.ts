import { inject, Pipe, PipeTransform } from "@angular/core";
import { I18nService } from "@main/shared/i18n/i18n.service";
import { DateTime } from "luxon";

/**
 * A custom Angular pipe that formats a date range into a localized string.
 * It supports translations for date units and handles optional end dates.
 *
 * @author Ariya Moheb
 */
@Pipe({
  name: "dateRange",
})
export class DateRangePipe implements PipeTransform {
  readonly i18nService = inject(I18nService);
  readonly locale = this.i18nService.getActiveLocale();
  readonly outputCalendar = this.locale === "fa" ? "persian" : undefined;
  readonly numberFormatter = new Intl.NumberFormat(this.locale);

  /**
   * Transforms a start and optional end date into a formatted, localized date range string.
   *
   * @param start - The start date of the range.
   * @param end - The optional end date of the range. If not provided, the current date is used.
   * @param showDuration - A boolean indicating whether to show the duration of the date range.
   * @returns A formatted string representing the date range and duration.
   * @throws Error if the start date is after the end date.
   */
  transform(start: Date, end?: Date, showDuration = true): string {
    const localeOptions = { locale: this.locale, outputCalendar: this.outputCalendar };
    if (end != null && start.valueOf() > end.valueOf()) {
      throw new Error("Start date cannot be after end date.");
    }
    const startDt = DateTime.fromJSDate(start);
    const endDt = end == null ? DateTime.now() : DateTime.fromJSDate(end);
    const duration = endDt.diff(startDt, ["year", "month", "day"]);
    const formattedStartDate = startDt.toFormat("MMM yyyy", localeOptions);
    const formattedEndDate =
      end == null
        ? this.i18nService.translate("time.present")
        : endDt.diff(startDt, ["month"]).months >= 1
          ? endDt.toFormat("MMM yyyy", localeOptions)
          : "";
    const formattedRange = `${formattedStartDate}${formattedEndDate ? " - " : ""}${formattedEndDate}`;
    if (!showDuration) {
      return formattedRange;
    }
    const separator = duration.years > 0 || duration.months > 0 ? " |" : "";
    const formattedYearUnit = this.i18nService.translate(
      `time.short.year${duration.years > 1 ? "s" : ""}`,
    );
    const formattedMonthUnit = this.i18nService.translate(
      `time.short.month${duration.months > 1 ? "s" : ""}`,
    );
    const formattedYears =
      duration.years > 0
        ? ` ${this.numberFormatter.format(duration.years)} ${formattedYearUnit}`
        : "";
    const formattedMonths =
      duration.months > 0
        ? ` ${this.numberFormatter.format(duration.months)} ${formattedMonthUnit}`
        : "";
    return `${formattedRange}${separator}${formattedYears}${formattedMonths}`;
  }
}
