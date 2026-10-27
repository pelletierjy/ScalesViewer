export type Locale = "en" | "fr" | "es" | "zh-CN";
export const locales: Locale[] = ["en", "fr", "es", "zh-CN"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
