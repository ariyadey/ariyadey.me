export type MenuItem = Readonly<{
  titleKey: string;
  iconName: string;
  fragment: string;
}>;

export const MENU: ReadonlyArray<MenuItem> = [
  {
    titleKey: "home",
    iconName: "home",
    fragment: "profile",
  },
  {
    titleKey: "about",
    iconName: "self_improvement",
    fragment: "summary",
  },
  {
    titleKey: "skills",
    iconName: "handyman",
    fragment: "skills",
  },
  {
    titleKey: "projects",
    iconName: "code",
    fragment: "projects",
  },
  {
    titleKey: "experience",
    iconName: "business_center",
    fragment: "experience",
  },
  {
    titleKey: "contact",
    iconName: "phone",
    fragment: "contact",
  },
];
