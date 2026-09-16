import { getRequestConfig } from "next-intl/server";
import { isLocale } from "./types";

export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale && isLocale(locale) ? locale : defaultLocale;
  const messages = (await import(`./messages/${safeLocale}.json`)).default;
  return {
    locale: safeLocale,
    messages,
    timeZone: "UTC",
    now: new Date(),
  };
});
