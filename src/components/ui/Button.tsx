import React from "react";

export type ButtonTone = "neutral" | "accent" | "accent2" | "danger" | "success";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
  size?: "sm" | "md";
}

const toneClassName: Record<ButtonTone, string> = {
  neutral: "rack-btn",
  accent:
    "rack-btn !bg-[var(--console-accent)] !text-[var(--console-accent-contrast)] !border-[var(--console-accent)] hover:opacity-90",
  accent2:
    "rack-btn !bg-[var(--console-accent-2)] !text-[var(--console-accent-contrast)] !border-[var(--console-accent-2)] hover:opacity-90",
  danger:
    "rack-btn !bg-[var(--console-danger)] !text-white !border-[var(--console-danger)] hover:opacity-90",
  success:
    "rack-btn !bg-[var(--console-success)] !text-white !border-[var(--console-success)] hover:opacity-90",
};

const sizeClassName: Record<"sm" | "md", string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

/** Console-styled action button with a small set of semantic tones. */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ tone = "neutral", size = "md", className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`${toneClassName[tone]} ${sizeClassName[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
