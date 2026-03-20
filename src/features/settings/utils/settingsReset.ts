/**
 * Settings Reset Utilities
 *
 * Functions for resetting application settings to factory defaults.
 */

import {
  ResetResult,
  LOCAL_STORAGE_KEYS,
} from "@/features/settings/types/settings.types";
import {
  clearAllSettings,
  isLocalStorageAvailable,
} from "@/lib/utils/localStorageManager";
import {
  ErrorMessages,
  formatError,
} from "@/features/settings/utils/settingsErrors";

/**
 * Get default settings for reset
 *
 * @returns Object containing default values for all settings
 */
export function getDefaultSettings(): {
  globalConfig: Record<string, unknown>;
  guitarSettings: Record<string, unknown>;
} {
  return {
    globalConfig: {
      isDarkMode: true,
      instrument: "piano",
      scale: {
        root: "A",
        type: "major",
        mode: "ionian",
      },
      showFlats: false,
      highlightRoots: true,
      showDegrees: false,
    },
    guitarSettings: {
      customTunings: [],
      fretCount: 24,
      flipX: false,
      flipY: false,
      baseTuning: 0,
    },
  };
}

/**
 * Clear all application settings from localStorage
 *
 * @returns Object with cleared keys and any errors
 */
export function clearAllSettingsWithDetails(): {
  cleared: string[];
  errors: string[];
} {
  return clearAllSettings();
}

/**
 * Reset all settings to factory defaults
 *
 * This clears all localStorage keys and lets the app reinitialize
 * with default values on next load.
 *
 * @returns Reset result
 */
export async function resetSettings(): Promise<ResetResult> {
  // Check if localStorage is available
  if (!isLocalStorageAvailable()) {
    return {
      success: false,
      cleared: [],
      error: ErrorMessages.LOCAL_STORAGE_UNAVAILABLE,
    };
  }

  try {
    // Clear all known settings
    const { cleared, errors } = clearAllSettingsWithDetails();

    if (errors.length > 0) {
      return {
        success: false,
        cleared,
        error: ErrorMessages.RESET_CLEAR_FAILED,
      };
    }

    return {
      success: true,
      cleared,
    };
  } catch (error) {
    return {
      success: false,
      cleared: [],
      error: formatError(error, "Reset failed"),
    };
  }
}
