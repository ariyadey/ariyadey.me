import { Component, inject } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { TruncatableDirective } from "@main/shared/layout/truncatable.directive";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styles: ``,
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardTitle, TruncatableDirective, I18nPipe],
})
export class SummaryComponent {
  readonly description = inject(PersonalInfoService).getMainInfo().description;
}
