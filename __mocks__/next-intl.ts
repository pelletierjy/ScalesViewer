import React from "react";

export const useTranslations = (namespace?: string) => {
  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    // Return a simple string representation for tests
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
