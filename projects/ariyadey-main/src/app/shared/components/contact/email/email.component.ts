import { Component, inject } from "@angular/core";
import { MatAnchor } from "@angular/material/button";
import { PersonalInfoService } from "@main/shared/personal-info/personal-info.service";

@Component({
  selector: "app-email",
  imports: [MatAnchor],
  templateUrl: "./email.component.html",
  styles: ``,
})
export class EmailComponent {
  readonly email = inject(PersonalInfoService).getContacts().email;
}
