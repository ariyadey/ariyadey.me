export type Social = Readonly<{
  title: SocialTitle;
  subtitle: string;
  iconName: string;
}>;

export enum SocialTitle {
  LINKEDIN = "LINKEDIN",
  TELEGRAM = "TELEGRAM",
  GITHUB = "GITHUB",
  STACK_OVERFLOW = "STACK_OVERFLOW",
}

export const SOCIALS: Readonly<Record<SocialTitle, Social>> = {
  [SocialTitle.LINKEDIN]: {
    title: SocialTitle.LINKEDIN,
    subtitle: "Connect with Me",
    iconName: "linkedin",
  },
  [SocialTitle.TELEGRAM]: {
    title: SocialTitle.TELEGRAM,
    subtitle: "Chat with Me",
    iconName: "telegram",
  },
  [SocialTitle.GITHUB]: {
    title: SocialTitle.GITHUB,
    subtitle: "View My Projects",
    iconName: "github",
  },
  [SocialTitle.STACK_OVERFLOW]: {
    title: SocialTitle.STACK_OVERFLOW,
    subtitle: "Ask Me Anything",
    iconName: "stack_overflow",
  },
};
