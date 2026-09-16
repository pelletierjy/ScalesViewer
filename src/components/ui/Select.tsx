import React from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/** Console-styled `<select>` — sharp corners, monospace value, accent focus ring. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", ...props }, ref) => (
    <select
      ref={ref}
      className={`rack-control px-2 py-1.5 text-sm ${className}`}
      {...props}
    />
  )
);
Select.displayName = "Select";
