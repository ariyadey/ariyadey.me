import { inject, Pipe, PipeTransform } from "@angular/core";
import { TranslocoPipe } from "@jsverse/transloco";
import { Language } from "@main/shared/i18n/i18n.service";

@Pipe({
  name: "i18n",
  pure: false,
  standalone: true,
})
export class I18nPipe implements PipeTransform {
  readonly translocoPipe = inject(TranslocoPipe);

  transform(key: string, params?: Record<string, unknown>, inlineLang?: Language): string {
    return this.translocoPipe.transform(key, params, inlineLang);
  }
}
