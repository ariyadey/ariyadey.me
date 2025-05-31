import { Company } from "@main/shared/business/company";
import { EmploymentType } from "@main/shared/business/employment-type";
import { Job } from "@main/shared/business/job";
import { Location } from "@main/shared/business/location";
import { LocationType } from "@main/shared/business/location-type";
import { Person } from "@main/shared/business/person";
import { Skill } from "@main/shared/business/skill";
import { SkillCategory } from "@main/shared/business/skill-category";
import { SOCIALS } from "@main/shared/business/social";

export const ARIYA_MOHEB: Person = {
  main: {
    firstName: "me.first-name",
    lastName: "me.last-name",
    headline: "me.headline",
    description: "me.description",
    avatarPath: "avatar-800w.avif",
    resumePath: "resume.pdf",
  },
  skills: {
    [SkillCategory.COMPUTER_SCIENCE]: [
      Skill.ALGORITHMS,
      Skill.DATA_STRUCTURES,
      Skill.OOP,
      Skill.FUNCTIONAL_PROGRAMMING,
      Skill.REACTIVE_PROGRAMMING,
      Skill.AOP,
      Skill.DESIGN_PATTERNS,
      Skill.TDD,
      Skill.SOLID,
      Skill.OWASP,
      Skill.I18N,
    ],
    [SkillCategory.BACKEND_DEVELOPMENT]: [
      Skill.JAVA,
      Skill.SPRING_FRAMEWORK,
      Skill.MAVEN,
      Skill.JUNIT,
      Skill.MOCKITO,
      Skill.RESTFUL_APIS,
      Skill.JWT,
      Skill.MAPSTRUCT,
    ],
    [SkillCategory.FRONTEND_DEVELOPMENT]: [
      Skill.TYPESCRIPT,
      Skill.ANGULAR_FRAMEWORK,
      Skill.RXJS,
      Skill.HTML,
      Skill.CSS,
      Skill.JAVASCRIPT,
    ],
    [SkillCategory.PLATFORMS_TOOLS]: [
      Skill.LINUX,
      Skill.GIT,
      Skill.GITHUB,
      Skill.INTELLIJ_IDEA,
      Skill.VS_CODE,
      Skill.JIRA,
    ],
  },
  projects: [
    {
      title: "portfolio",
      description: "portfolio",
      skills: [Skill.ANGULAR_FRAMEWORK, Skill.TYPESCRIPT, Skill.RXJS, Skill.I18N],
      link: "https://github.com/ariyadey/personal-website",
      timeFrame: {
        start: new Date(2024, 6),
      },
    },
    {
      title: "minesweeper",
      description: "minesweeper",
      skills: [
        Skill.REACT,
        Skill.JSX,
        Skill.ALGORITHMS,
        Skill.BREATH_FIRST_SEARCH,
        Skill.DEPTH_FIRST_SEARCH,
      ],
      link: "https://github.com/ariyadey/minesweeper",
      timeFrame: {
        start: new Date(2020, 12),
        end: new Date(2020, 12),
      },
    },
  ],
  experiences: [
    {
      title: Job.SOFTWARE_ENGINEER,
      companyName: Company.TOSAN,
      companyLogoPath: "tosan.jpeg",
      employmentType: EmploymentType.FULL_TIME,
      location: Location.TEHRAN,
      locationType: LocationType.HYBRID,
      timeFrame: {
        start: new Date(2021, 3),
      },
      description: "tosan",
      skills: [
        Skill.JAVA,
        Skill.SPRING_FRAMEWORK,
        Skill.TYPESCRIPT,
        Skill.ANGULAR_FRAMEWORK,
        Skill.OWASP,
      ],
      link: "https://www.tosan.com",
    },
    {
      title: Job.WEB_DEVELOPER,
      companyName: Company.ASTA,
      companyLogoPath: "asta.jpeg",
      employmentType: EmploymentType.INTERNSHIP,
      location: Location.TEHRAN,
      locationType: LocationType.REMOTE,
      timeFrame: {
        start: new Date(2021, 1),
        end: new Date(2021, 3),
      },
      description: "asta",
      skills: [Skill.JAVA, Skill.SPRING_FRAMEWORK, Skill.JUNIT, Skill.SOLID],
      link: "https://asta.ir/",
    },
  ],
  contacts: {
    email: "ariya.mms@gmail.com",
    socials: [
      { ...SOCIALS.TELEGRAM, url: "https://ariyadey.t.me" },
      { ...SOCIALS.LINKEDIN, url: "https://linkedin.com/in/ariyadey" },
      { ...SOCIALS.GITHUB, url: "http://github.com/ariyadey" },
      { ...SOCIALS.STACK_OVERFLOW, url: "https://stackoverflow.com/users/7930516/ariyadey" },
    ],
  },
};
