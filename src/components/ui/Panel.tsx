import React from "react";

interface PanelProps {
  /** Optional uppercase mono title rendered in the panel header strip. */
  title?: React.ReactNode;
  /** Optional controls rendered on the right side of the header strip. */
  headerRight?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

/**
 * Base "rack unit" container: sharp-edged bordered panel with an optional
 * header strip. Used throughout the app in place of the old ad-hoc
 * `rounded-lg border ${isDarkMode ? ... : ...}` card pattern.
 */
export const Panel: React.FC<PanelProps> = ({
  title,
  headerRight,
  className = "",
  bodyClassName = "p-3",
  children,
}) => {
  return (
    <div className={`rack-panel ${className}`}>
      {(title || headerRight) && (
        <div className="rack-panel-header">
          {title && <h3 className="rack-label">{title}</h3>}
          {headerRight}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};
