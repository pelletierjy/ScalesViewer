/**
 * ImportButton Component
 *
 * Button component for importing settings from a JSON file.
 */

import React, { useRef, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";
import { useSettingsManager } from "@/features/settings/hooks/useSettingsManager";
import { ImportOptions } from "@/features/settings/types/settings.types";

interface ImportButtonProps {
  onSuccess?: (applied: string[]) => void;
  onError?: (error: string) => void;
  onVersionMismatch?: (currentVersion: string, importVersion: string) => void;
  options?: ImportOptions;
  className?: string;
}

// Extract version from skipped items
function extractVersionFromSkipped(skipped: string[]): string | null {
  const versionItem = skipped.find(item => item.includes("Version mismatch"));
  if (versionItem) {
    const match = versionItem.match(/imported from ([^,]+)/);
    return match ? match[1] : null;
  }
  return null;
}

/**
 * Button for importing application settings from a JSON file
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
  onSuccess,
  onError,
  onVersionMismatch,
  options,
  className = "",
}) => {
  // onVersionMismatch is used in handleFileSelect
  const isDarkMode = useSelector(selectIsDarkMode);
  const { importSettings, isImporting } = useSettingsManager();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await importSettings(file, options);

    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (result.success) {
      // Check for version mismatch in skipped items
      const importVersion = extractVersionFromSkipped(result.skipped);
      if (importVersion && onVersionMismatch) {
        onVersionMismatch("0.1.0", importVersion);
      }
      onSuccess?.(result.applied);
    } else {
      onError?.(result.error || "Import failed");
    }
  };

  const buttonClasses = `
    w-full px-4 py-3 rounded-md font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${
      isDarkMode
        ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
        : "bg-green-500 hover:bg-green-600 text-white focus:ring-green-400"
    }
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select JSON file to import"
      />
      <button
        onClick={handleClick}
        disabled={isImporting}
        className={buttonClasses}
        aria-label="Import settings from a JSON file"
        aria-busy={isImporting}
      >
        {isImporting ? (
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
            Importing...
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Import Settings
          </span>
        )}
      </button>
    </>
  );
};
