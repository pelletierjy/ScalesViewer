import { getRequestConfig } from "next-intl/server";
import { isLocale, Locale, defaultLocale, locales } from "./types";

export { defaultLocale, locales };
export type { Locale };

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