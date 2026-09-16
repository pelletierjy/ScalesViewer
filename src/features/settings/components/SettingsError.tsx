/**
 * SettingsError Component
 *
 * Displays inline error messages for settings operations.
 */

import React from "react";

interface SettingsErrorProps {
  message: string | null;
  onDismiss?: () => void;
  className?: string;
}

/**
 * Displays an error message related to settings operations
 */
export const SettingsError: React.FC<SettingsErrorProps> = ({
  message,
  onDismiss,
  className = "",
}) => {
  if (!message) return null;

  return (
    <div
      className={`p-3 rounded-none border border-[var(--console-danger)] bg-[color-mix(in_srgb,var(--console-danger)_12%,transparent)] text-[var(--console-danger)] mb-4 ${className}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 -mr-1 p-1 hover:opacity-70 transition-opacity"
            aria-label="Dismiss error"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
