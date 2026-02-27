export type Lang = "no" | "en";

export const DEFAULT_LANG: Lang = "no";

export function isLang(value: string | undefined): value is Lang {
  return value === "no" || value === "en";
}