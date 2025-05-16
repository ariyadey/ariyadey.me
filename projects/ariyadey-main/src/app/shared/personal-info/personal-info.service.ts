import { Injectable } from "@angular/core";
import { ARIYA_MOHEB } from "@main/shared/personal-info/ARIYA_MOHEB";

@Injectable({
  providedIn: "root",
})
export class PersonalInfoService {
  getMainInfo() {
    return ARIYA_MOHEB.main;
  }

  getSkills() {
    return ARIYA_MOHEB.skills;
  }

  getProjects() {
    return ARIYA_MOHEB.projects;
  }

  getExperiences() {
    return ARIYA_MOHEB.experiences;
  }

  getContacts() {
    return ARIYA_MOHEB.contacts;
  }
}
