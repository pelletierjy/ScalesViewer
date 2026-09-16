import React from "react";
import enMessages from "@/lib/i18n/messages/en.json";

function getNestedValue(obj: unknown, path: string): string | unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export const useTranslations = (namespace?: string) => {
  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const value = getNestedValue(enMessages, fullKey);
    if (typeof value === "string") {
      return value;
    }
    // Fallback to key if translation not found (preserves existing test behavior for missing keys)
    return fullKey;
  };
};

export const useLocale = () => "en";

export const NextIntlClientProvider: React.FC<{
  locale: string;
  messages?: Record<string, unknown>;
  children: React.ReactNode;
}> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};
