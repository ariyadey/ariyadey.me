import { Skill } from "@main/shared/business/skill";

export type Project = Readonly<{
  title: string;
  description: string;
  skills: ReadonlyArray<Skill>;
  link: string;
  timeFrame: Readonly<{
    start: Date;
    end?: Date;
  }>;
}>;
