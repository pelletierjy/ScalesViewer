import React from "react";

interface StageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * "Hardware surface" wrapper for instrument SVG diagrams (fretboard, keys,
 * tines, holes...). Recessed rack-well styling replaces the previous
 * per-page `border rounded-lg ${isDarkMode ? ... : ...}` duplication.
 */
export const Stage: React.FC<StageProps> = ({ children, className = "" }) => (
  <div className={`w-full overflow-x-auto rack-stage ${className}`}>{children}</div>
);
