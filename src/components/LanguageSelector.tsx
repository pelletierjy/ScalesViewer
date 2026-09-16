"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, setLanguage, saveState } from "@/features/globalConfig/globalConfigSlice";
import { Locale, locales } from "@/lib/i18n/types";
import { Select } from "@/components/ui";
import { useTranslations } from "next-intl";

interface LanguageSelectorProps {
  className?: string;
}

const LANGUAGE_OPTIONS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const t = useTranslations();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Locale;
    dispatch(setLanguage(newLang));
    dispatch(saveState());
  };

  return (
    <Select
      value={language}
      onChange={handleChange}
      className={className}
      aria-label={t("aria.languageSelector")}
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {LANGUAGE_OPTIONS[locale]}
        </option>
      ))}
    </Select>
  );
};
