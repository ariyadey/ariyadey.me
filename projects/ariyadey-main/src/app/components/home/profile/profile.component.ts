import { NgTemplateOutlet } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatAnchor } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
  MatCardXlImage,
} from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { CommunicationChannelsComponent } from "@main/shared/components/contact/communication-channels/communication-channels.component";

import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { ImgResolvePipe } from "@main/shared/image-resolver.pipe";
import { LayoutService } from "@main/shared/layout/layout.service";

import { ScrollableDirective } from "@main/shared/layout/scrollable.directive";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";

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
    MatCardTitleGroup,
    MatCardXlImage,
    CommunicationChannelsComponent,
    NgTemplateOutlet,
  ],
  templateUrl: "./profile.component.html",
  styles: ``,
})
export class ProfileComponent {
  readonly layout = inject(LayoutService).layout;
  readonly mainInfo = inject(PersonalInfoService).getMainInfo();
  readonly email = inject(PersonalInfoService).getContacts().email;
}
