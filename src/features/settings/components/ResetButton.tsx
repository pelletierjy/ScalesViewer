/**
 * ResetButton Component
 *
 * Button component for resetting settings to factory defaults.
 */

import React from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";
import { useSettingsManager } from "@/features/settings/hooks/useSettingsManager";

interface ResetButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * Button for resetting application settings to factory defaults
 */
export const ResetButton: React.FC<ResetButtonProps> = ({
  onSuccess,
  onError,
  onCancel,
  className = "",
}) => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const { resetSettings, isResetting } = useSettingsManager();

  const handleReset = async (): Promise<void> => {
    const result = await resetSettings(true); // Always require confirmation

    if (result.success) {
      onSuccess?.();
    } else if (result.error === "Reset cancelled by user") {
      onCancel?.();
    } else {
      onError?.(result.error || "Reset failed");
    }
  };

  const buttonClasses = `
    w-full px-4 py-3 rounded-md font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${
      isDarkMode
        ? "bg-red-700 hover:bg-red-800 text-white focus:ring-red-500"
        : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-400"
    }
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  return (
    <button
      onClick={handleReset}
      disabled={isResetting}
      className={buttonClasses}
      aria-label="Reset all settings to factory defaults. This will show a confirmation dialog."
      aria-busy={isResetting}
    >
      {isResetting ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Resetting...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Reset to Defaults
        </span>
      )}
    </button>
  );
};
