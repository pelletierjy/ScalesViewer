import React from "react";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Console-styled text/number `<input>` matching `Select`/`IconButton` chrome. */
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className = "", ...props }, ref) => (
    <input ref={ref} className={`rack-control px-2 py-1.5 text-sm ${className}`} {...props} />
  )
);
TextInput.displayName = "TextInput";
