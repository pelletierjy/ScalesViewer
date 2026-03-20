/**
 * SettingsPanel Component
 *
 * Main settings UI container - modal dialog with export, import, and reset buttons.
 */

import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";
import { useSettingsManager } from "@/features/settings/hooks/useSettingsManager";
import { ExportButton } from "./ExportButton";
import { ImportButton } from "./ImportButton";
import { ResetButton } from "./ResetButton";
import { SettingsError } from "./SettingsError";
import { SuccessMessages } from "@/features/settings/utils/settingsErrors";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Modal dialog for managing application settings
 */
export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const { error, clearError } = useSettingsManager();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Handle escape key to close modal
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Focus trap within modal
  const handleTabKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    },
    []
  );

  // Handle success feedback
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const handleExportSuccess = (filename: string) => {
    setSuccessMessage(SuccessMessages.EXPORT_SUCCESS(filename));
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const [versionWarning, setVersionWarning] = React.useState<string | null>(null);

  const handleImportSuccess = (applied: string[]) => {
    setSuccessMessage(SuccessMessages.IMPORT_SUCCESS(applied.length));
    // Reload after import to apply changes
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleVersionMismatch = (currentVersion: string, importVersion: string) => {
    setVersionWarning(
      `Warning: This settings file was exported from version ${importVersion} (current: ${currentVersion}). Some settings may not be compatible.`
    );
  };

  const handleResetSuccess = () => {
    // Page will reload from useSettingsManager
  };

  const handleError = (err: string) => {
    // Error is already set in useSettingsManager
    console.error("Settings operation failed:", err);
  };

  // Set up keyboard listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keydown", handleTabKey);
      // Focus first element when opened
      firstFocusableRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen, handleKeyDown, handleTabKey]);

  // Return focus to trigger when closed
  useEffect(() => {
    if (!isOpen && triggerRef?.current) {
      triggerRef.current.focus();
    }
  }, [isOpen, triggerRef]);

  // Clear errors when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      clearError();
      setSuccessMessage(null);
    }
  }, [isOpen, clearError]);

  if (!isOpen) return null;

  const overlayClasses = `
    fixed inset-0 z-50 flex items-center justify-center p-4
    bg-black/50 backdrop-blur-sm
    transition-opacity duration-200
  `;

  const panelClasses = `
    w-full max-w-md rounded-lg shadow-xl
    ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
    transform transition-all duration-200
  `;

  const headerClasses = `
    flex items-center justify-between px-6 py-4 border-b
    ${isDarkMode ? "border-gray-700" : "border-gray-200"}
  `;

  const contentClasses = "p-6 space-y-4";

  const dividerClasses = `
    my-4 border-t
    ${isDarkMode ? "border-gray-700" : "border-gray-200"}
  `;

  const successClasses = `
    p-4 rounded-md mb-4
    ${
      isDarkMode
        ? "bg-green-900/30 border border-green-700 text-green-200"
        : "bg-green-50 border border-green-200 text-green-800"
    }
  `;

  const warningClasses = `
    p-4 rounded-md mb-4
    ${
      isDarkMode
        ? "bg-yellow-900/30 border border-yellow-700 text-yellow-200"
        : "bg-yellow-50 border border-yellow-200 text-yellow-800"
    }
  `;

  return (
    <div
      className={overlayClasses}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={panelRef}
        className={panelClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-panel-title"
      >
        <div className={headerClasses}>
          <h2
            id="settings-panel-title"
            className="text-xl font-semibold"
          >
            Settings
          </h2>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Close settings panel"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className={contentClasses}>
          {successMessage && (
            <div className={successClasses} role="alert" aria-live="polite">
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {versionWarning && (
            <div className={warningClasses} role="alert" aria-live="polite">
              <div className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm font-medium">{versionWarning}</p>
              </div>
            </div>
          )}

          <SettingsError message={error} onDismiss={clearError} />

          <div className="space-y-3">
            <ExportButton
              onSuccess={handleExportSuccess}
              onError={handleError}
            />

            <ImportButton
              onSuccess={handleImportSuccess}
              onError={handleError}
              onVersionMismatch={handleVersionMismatch}
            />
          </div>

          <hr className={dividerClasses} aria-hidden="true" />

          <div className="pt-2">
            <p
              className={`text-sm mb-3 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Reset all settings to their original defaults. This action cannot
              be undone.
            </p>
            <ResetButton
              onSuccess={handleResetSuccess}
              onError={handleError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
