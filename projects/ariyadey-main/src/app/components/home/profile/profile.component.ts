import { NgOptimizedImage, NgTemplateOutlet } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatAnchor } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
} from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { CommunicationChannelsComponent } from "@main/shared/components/contact/communication-channels/communication-channels.component";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { LayoutObserver } from "@main/shared/layout/layout-observer";
import { ScrollableDirective } from "@main/shared/layout/scrollable.directive";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";
import { ImgResolvePipe } from "@main/shared/resource/image-resolver.pipe";

@Component({
  selector: "app-profile",
  imports: [
    MatCardSubtitle,
    MatCardHeader,
    MatCard,
    MatCardActions,
    MatCardTitle,
    ScrollableDirective,
    MatAnchor,
    ImgResolvePipe,
    I18nPipe,
    RouterLink,
    MatCardTitleGroup,
    CommunicationChannelsComponent,
    NgTemplateOutlet,
    NgOptimizedImage,
  ],
  templateUrl: "./profile.component.html",
  styles: ``,
})
export class ProfileComponent {
  readonly breakpoint = inject(LayoutObserver).breakpoint;
  readonly mainInfo = inject(PersonalInfoService).getMainInfo();
  readonly email = inject(PersonalInfoService).getContacts().email;
}
