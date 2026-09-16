/**
 * ExportButton Component
 *
 * Button component for exporting settings to a JSON file.
 */

import React from "react";
import { useSettingsManager } from "@/features/settings/hooks/useSettingsManager";
import { SuccessMessages } from "@/features/settings/utils/settingsErrors";
import { Button } from "@/components/ui";

interface ExportButtonProps {
  onSuccess?: (filename: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

/**
 * Button for exporting application settings to a JSON file
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
  onSuccess,
  onError,
  className = "",
}) => {
  const { exportSettings, isExporting } = useSettingsManager();

  const handleExport = async (): Promise<void> => {
    const result = await exportSettings();

    if (result.success) {
      onSuccess?.(result.filename);
    } else {
      onError?.(result.error || "Export failed");
    }
  };

  return (
    <Button
      tone="accent2"
      onClick={handleExport}
      disabled={isExporting}
      className={`w-full disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label="Export all application settings to a JSON file"
      aria-busy={isExporting}
    >
      {isExporting ? (
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
          Exporting...
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export Settings
        </span>
      )}
    </Button>
  );
};
