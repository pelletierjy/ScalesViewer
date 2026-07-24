/**
 * SettingsPanel Component
 *
 * Main settings UI container - modal dialog with export, import, and reset buttons.
 */

import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSoundEngine,
  setSoundEngine,
  saveState,
} from "@/features/globalConfig/globalConfigSlice";
import { SoundEngine } from "@/lib/audio/instrumentSampleConfig";
import { useSettingsManager } from "@/features/settings/hooks/useSettingsManager";
import { ExportButton } from "./ExportButton";
import { ImportButton } from "./ImportButton";
import { ResetButton } from "./ResetButton";
import { SettingsError } from "./SettingsError";
import { SuccessMessages } from "@/features/settings/utils/settingsErrors";
import { Select } from "@/components/ui";

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
  const dispatch = useDispatch();
  const soundEngine = useSelector(selectSoundEngine);
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

  const overlayClasses = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200";

  const contentClasses = "p-4 space-y-4";

  const dividerClasses = "my-4 border-t border-[var(--console-border)]";

  const successClasses =
    "p-3 mb-4 border border-[var(--console-success)] bg-[color-mix(in_srgb,var(--console-success)_12%,transparent)] text-[var(--console-success)]";

  const warningClasses =
    "p-3 mb-4 border border-[var(--console-accent)] bg-[color-mix(in_srgb,var(--console-accent)_12%,transparent)] text-[var(--console-accent-strong)]";

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
        className="rack-panel w-full max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-panel-title"
      >
        <div className="rack-panel-header">
          <h2
            id="settings-panel-title"
            className="rack-label text-sm"
          >
            Settings
          </h2>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="p-1 hover:text-[var(--console-accent)] transition-colors"
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

          <section aria-labelledby="sound-settings-title">
            <h3
              id="sound-settings-title"
              className="rack-label mb-2"
            >
              Sound
            </h3>
            <label
              htmlFor="sound-engine-select"
              className="block text-sm mb-1 text-[var(--console-text-dim)]"
            >
              Playback engine
            </label>
            <Select
              id="sound-engine-select"
              value={soundEngine}
              onChange={(e) => {
                dispatch(setSoundEngine(e.target.value as SoundEngine));
                dispatch(saveState());
              }}
              className="w-full"
            >
              <option value="sample">Instrument samples</option>
              <option value="synth">Pluck synth</option>
              <option value="sine">Classic sine</option>
            </Select>
            <p className="text-xs mt-2 text-[var(--console-text-faint)]">
              {soundEngine === "sample" &&
                "Short recorded tones per instrument, pitched to each note."}
              {soundEngine === "synth" &&
                "Synthesized pluck for guitar and kalimba; samples for piano and harmonica."}
              {soundEngine === "sine" &&
                "Simple sine tone (original behavior)."}
            </p>
          </section>

          <hr className={dividerClasses} aria-hidden="true" />

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
            <p className="text-sm mb-3 text-[var(--console-text-dim)]">
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
