import { NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatChip, MatChipSet } from "@angular/material/chips";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { DateRangePipe } from "@main/shared/i18n/date-range.pipe";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { TruncatableDirective } from "@main/shared/layout/truncatable.directive";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";
import { ImgResolvePipe } from "@main/shared/resource/image-resolver.pipe";

@Component({
  selector: "app-experience",
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatChipSet,
    MatChip,
    TruncatableDirective,
    NgOptimizedImage,
    MatIcon,
    ImgResolvePipe,
    I18nPipe,
    MatDivider,
    DateRangePipe,
  ],
  templateUrl: "./experience.component.html",
  styles: ``,
})
export class ExperienceComponent {
  readonly experiences = inject(PersonalInfoService).getExperiences();
}
