/**
 * useSettingsManager Hook
 *
 * Core hook providing export, import, and reset functionality.
 * Used by settings UI components.
 */

import { useState, useCallback, useRef } from "react";
import {
  ExportOptions,
  ExportResult,
  ImportOptions,
  ImportResult,
  ResetResult,
  UseSettingsManagerReturn,
} from "@/features/settings/types/settings.types";
import { exportSettings as exportSettingsUtil } from "@/features/settings/utils/settingsExport";
import { importSettings as importSettingsUtil } from "@/features/settings/utils/settingsImport";
import { resetSettings as resetSettingsUtil } from "@/features/settings/utils/settingsReset";

/**
 * Hook for managing settings export, import, and reset operations
 *
 * @returns Object with export/import/reset functions and loading/error states
 *
 * @example
 * const { exportSettings, importSettings, resetSettings, isExporting, error } = useSettingsManager();
 *
 * // Export settings
 * const result = await exportSettings({ filename: 'my-backup' });
 *
 * // Import settings
 * const file = e.target.files[0];
 * const result = await importSettings(file);
 *
 * // Reset settings
 * const result = await resetSettings(true); // with confirmation
 */
export function useSettingsManager(): UseSettingsManagerReturn {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use ref to track if any operation is in progress
  const operationInProgress = useRef(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Export settings to a JSON file
   */
  const exportSettings = useCallback(
    async (options?: ExportOptions): Promise<ExportResult> => {
      if (operationInProgress.current) {
        return {
          success: false,
          filename: "",
          data: { version: "", exportedAt: "" },
          error: "Another operation is in progress",
        };
      }

      operationInProgress.current = true;
      setIsExporting(true);
      setError(null);

      try {
        const result = await exportSettingsUtil(options);
        if (!result.success) {
          setError(result.error || "Export failed");
        }
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Export failed";
        setError(errorMessage);
        return {
          success: false,
          filename: "",
          data: { version: "", exportedAt: "" },
          error: errorMessage,
        };
      } finally {
        setIsExporting(false);
        operationInProgress.current = false;
      }
    },
    []
  );

  /**
   * Import settings from a JSON file
   */
  const importSettings = useCallback(
    async (file: File, options?: ImportOptions): Promise<ImportResult> => {
      if (operationInProgress.current) {
        return {
          success: false,
          applied: [],
          skipped: [],
          error: "Another operation is in progress",
        };
      }

      operationInProgress.current = true;
      setIsImporting(true);
      setError(null);

      try {
        const result = await importSettingsUtil(file, options);
        if (!result.success) {
          setError(result.error || "Import failed");
        }
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Import failed";
        setError(errorMessage);
        return {
          success: false,
          applied: [],
          skipped: [],
          error: errorMessage,
        };
      } finally {
        setIsImporting(false);
        operationInProgress.current = false;
      }
    },
    []
  );

  /**
   * Reset all settings to defaults
   */
  const resetSettings = useCallback(
    async (requireConfirmation = true): Promise<ResetResult> => {
      if (operationInProgress.current) {
        return {
          success: false,
          cleared: [],
          error: "Another operation is in progress",
        };
      }

      // Show confirmation dialog if required
      if (requireConfirmation) {
        const confirmed = window.confirm(
          "This will reset ALL settings to their default values. This action cannot be undone.\n\n" +
            "The page will reload after reset to apply the changes.\n\n" +
            "Do you want to continue?"
        );
        if (!confirmed) {
          return {
            success: false,
            cleared: [],
            error: "Reset cancelled by user",
          };
        }
      }

      operationInProgress.current = true;
      setIsResetting(true);
      setError(null);

      try {
        const result = await resetSettingsUtil();
        if (!result.success) {
          setError(result.error || "Reset failed");
        } else {
          // Reload page after successful reset to apply changes
          window.location.reload();
        }
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Reset failed";
        setError(errorMessage);
        return {
          success: false,
          cleared: [],
          error: errorMessage,
        };
      } finally {
        setIsResetting(false);
        operationInProgress.current = false;
      }
    },
    []
  );

  return {
    // Export
    exportSettings,
    isExporting,

    // Import
    importSettings,
    isImporting,

    // Reset
    resetSettings,
    isResetting,

    // Error handling
    error,
    clearError,
  };
}
