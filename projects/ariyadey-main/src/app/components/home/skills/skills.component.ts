import { KeyValuePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatChip, MatChipSet } from "@angular/material/chips";
import { MatDivider } from "@angular/material/divider";

import { MatListItemLine } from "@angular/material/list";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { LayoutObserver } from "@main/shared/layout/layout-observer";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";

@Component({
  selector: "app-skills",
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatChipSet,
    MatChip,
    MatListItemLine,
    KeyValuePipe,
    I18nPipe,
    MatDivider,
  ],
  templateUrl: "./skills.component.html",
  styles: ``,
})
export class SkillsComponent {
  readonly breakpoint = inject(LayoutObserver).breakpoint;
  readonly categorizedSkills = inject(PersonalInfoService).getSkills();

  compareFn() {
    return 0;
  }
}
