export type Theme = Readonly<{
  name: "DEFAULT";
  variant: "AUTO" | "LIGHT" | "DARK";
}>;

export const DEFAULT_THEME: Theme = {
  name: "DEFAULT",
  variant: "AUTO",
};
