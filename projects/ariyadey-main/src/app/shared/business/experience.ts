import { Company } from "@main/shared/business/company";
import { EmploymentType } from "@main/shared/business/employment-type";
import { Job } from "@main/shared/business/job";
import { Location } from "@main/shared/business/location";
import { LocationType } from "@main/shared/business/location-type";
import { Skill } from "@main/shared/business/skill";

export type Experience = Readonly<{
  title: Job;
  companyName: Company;
  companyLogoPath: string;
  employmentType: EmploymentType;
  location: Location;
  locationType: LocationType;
  timeFrame: Readonly<{
    start: Date;
    end?: Date;
  }>;
  description: string;
  skills: ReadonlyArray<Skill>;
  link: string;
}>;
