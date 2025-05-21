import { Component } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { CommunicationChannelsComponent } from "@main/shared/components/contact/communication-channels/communication-channels.component";
import { EmailComponent } from "@main/shared/components/contact/email/email.component";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";

@Component({
  selector: "app-contact",
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    I18nPipe,
    CommunicationChannelsComponent,
    EmailComponent,
  ],
  templateUrl: "./contact.component.html",
  styles: ``,
})
export class ContactComponent {}
