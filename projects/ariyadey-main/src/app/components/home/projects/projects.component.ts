import { Component, inject } from "@angular/core";
import { MatIconAnchor } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatChip, MatChipSet } from "@angular/material/chips";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { DateRangePipe } from "@main/shared/i18n/date-range.pipe";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { TruncatableDirective } from "@main/shared/layout/truncatable.directive";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";

@Component({
  selector: "app-projects",
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatChipSet,
    MatChip,
    MatIcon,
    MatIconAnchor,
    I18nPipe,
    MatDivider,
    DateRangePipe,
    TruncatableDirective,
  ],
  templateUrl: "./projects.component.html",
  styles: ``,
})
export class ProjectsComponent {
  readonly projects = inject(PersonalInfoService).getProjects();
}
