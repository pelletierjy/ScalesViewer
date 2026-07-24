import React from "react";

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="rack-panel px-3 py-1.5">
      <p className="rack-label !text-[var(--console-text-faint)] text-center sm:text-left">
        © {new Date().getFullYear()} Scales Viewer — All rights reserved.
      </p>
    </footer>
  );
};
