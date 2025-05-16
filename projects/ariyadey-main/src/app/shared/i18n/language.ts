import { Direction } from "@angular/cdk/bidi";

export enum Language {
  ENGLISH = "en",
  PERSIAN = "fa",
}

export const LanguageDirection: Readonly<Record<Language, Direction>> = {
  [Language.ENGLISH]: "ltr",
  [Language.PERSIAN]: "rtl",
};
