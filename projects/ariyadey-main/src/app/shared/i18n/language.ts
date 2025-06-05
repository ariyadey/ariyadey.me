import { Direction } from "@angular/cdk/bidi";

export enum Language {
  ENGLISH = "en",
  PERSIAN = "fa",
}

export const LANGUAGE_DIRECTION_MAP: Readonly<Record<Language, Direction>> = {
  [Language.ENGLISH]: "ltr",
  [Language.PERSIAN]: "rtl",
};
