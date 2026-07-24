import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** Square-ish console button for icon/glyph toggles (dark mode, flip, help, ...). */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ active = false, className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      data-active={active || undefined}
      className={`rack-btn p-2 leading-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);
IconButton.displayName = "IconButton";
