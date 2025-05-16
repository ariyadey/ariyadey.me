import { inject, Pipe, PipeTransform } from "@angular/core";
import { I18nService } from "@main/shared/i18n/i18n.service";
import { Language } from "@main/shared/i18n/language";

@Pipe({
  name: "i18n",
})
export class I18nPipe implements PipeTransform {
  readonly i18nService = inject(I18nService);

  transform(key: string, params?: Record<string, unknown>, language?: Language): string {
    return this.i18nService.translate(key, { params, language });
  }
}
