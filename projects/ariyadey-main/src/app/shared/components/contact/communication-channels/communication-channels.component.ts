import { booleanAttribute, Component, inject, input } from "@angular/core";
import { MatIconAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";

@Component({
  selector: "app-communication-channels",
  imports: [MatIcon, MatIconAnchor],
  templateUrl: "./communication-channels.component.html",
  styles: ``,
})
export class CommunicationChannelsComponent {
  readonly showEmail = input(true, { transform: booleanAttribute });
  readonly contacts = inject(PersonalInfoService).getContacts();
}
