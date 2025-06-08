import { Contacts } from "@main/shared/business/contacts";
import { Experience } from "@main/shared/business/experience";
import { Project } from "@main/shared/business/project";
import { Skill } from "@main/shared/business/skill";
import { SkillCategory } from "@main/shared/business/skill-category";

export type Person = Readonly<{
  main: {
    firstName: string;
    lastName: string;
    headline: string;
    description: string;
    avatarPath: string;
    avatarPathAlt: string;
    resumePath: string;
  };
  skills: Readonly<Record<SkillCategory, ReadonlyArray<Skill>>>;
  projects: ReadonlyArray<Project>;
  experiences: ReadonlyArray<Experience>;
  contacts: Contacts;
}>;
