/**
 * SettingsError Component
 *
 * Displays inline error messages for settings operations.
 */

import React from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";

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
  const isDarkMode = useSelector(selectIsDarkMode);

  if (!message) return null;

  const containerClasses = `
    p-4 rounded-md mb-4
    ${
      isDarkMode
        ? "bg-red-900/30 border border-red-700 text-red-200"
        : "bg-red-50 border border-red-200 text-red-800"
    }
    ${className}
  `;

  return (
    <div
      className={containerClasses}
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
            className={`flex-shrink-0 -mr-1 p-1 rounded-full transition-colors ${
              isDarkMode
                ? "hover:bg-red-800 text-red-300"
                : "hover:bg-red-100 text-red-600"
            }`}
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
