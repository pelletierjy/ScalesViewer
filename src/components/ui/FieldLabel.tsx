import React from "react";

interface FieldLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

/** Small uppercase monospace label used above every control in a rack strip. */
export const FieldLabel: React.FC<FieldLabelProps> = ({ htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`rack-label ${className}`}>
    {children}
  </label>
);

interface FieldProps {
  label: React.ReactNode;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label + control stacked vertically — the standard rack-strip field unit. */
export const Field: React.FC<FieldProps> = ({ label, htmlFor, className = "", children }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
    {children}
  </div>
);
