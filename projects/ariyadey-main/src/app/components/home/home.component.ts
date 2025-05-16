import { Component } from "@angular/core";
import { ContactComponent } from "@main/components/home/contact/contact.component";
import { ExperienceComponent } from "@main/components/home/experience/experience.component";
import { ProfileComponent } from "@main/components/home/profile/profile.component";
import { ProjectsComponent } from "@main/components/home/projects/projects.component";
import { SkillsComponent } from "@main/components/home/skills/skills.component";
import { SummaryComponent } from "@main/components/home/summary/summary.component";

@Component({
  selector: "app-home",
  imports: [
    ContactComponent,
    SummaryComponent,
    SkillsComponent,
    ProfileComponent,
    ProjectsComponent,
    ExperienceComponent,
  ],
  templateUrl: "./home.component.html",
  styles: ``,
})
export class HomeComponent {}
