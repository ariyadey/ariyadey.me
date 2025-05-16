import { Component, inject } from "@angular/core";
import { MatAnchor, MatIconAnchor } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";

import { MatIcon } from "@angular/material/icon";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";

@Component({
  selector: "app-contact",
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatIcon,
    MatAnchor,
    MatIconAnchor,
    I18nPipe,
  ],
  templateUrl: "./contact.component.html",
  styles: ``,
})
export class ContactComponent {
  readonly contacts = inject(PersonalInfoService).getContacts();
}
