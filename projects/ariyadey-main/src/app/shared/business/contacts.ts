import { Social } from "@main/shared/business/social";

export type Contacts = Readonly<{
  email: string;
  socials: ReadonlyArray<Social & { url: string }>;
}>;
