import { Component, inject } from "@angular/core";
import { MatAnchor } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from "@angular/material/card";
import { RouterLink } from "@angular/router";

import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { ImgResolvePipe } from "@main/shared/image-resolver.pipe";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";

import { ScrollableDirective } from "@main/shared/scrollable.directive";

@Component({
  selector: "app-profile",
  imports: [
    MatCardSubtitle,
    MatCardHeader,
    MatCard,
    MatCardActions,
    MatCardImage,
    MatCardTitle,
    ScrollableDirective,
    MatAnchor,
    ImgResolvePipe,
    I18nPipe,
    RouterLink,
  ],
  templateUrl: "./profile.component.html",
  styles: ``,
})
export class ProfileComponent {
  readonly mainInfo = inject(PersonalInfoService).getMainInfo();
}
