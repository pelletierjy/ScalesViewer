import React from "react";
import { useTranslations } from "next-intl";

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = () => {
  const t = useTranslations();
  return (
    <footer className="rack-panel px-3 py-1.5">
      <p className="rack-label !text-[var(--console-text-faint)] text-center sm:text-left">
        © {new Date().getFullYear()} {t("app.title")} — {t("footer.allRightsReserved", { defaultMessage: "All rights reserved." })}
      </p>
    </footer>
  );
};
