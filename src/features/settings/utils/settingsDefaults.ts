/**
 * Settings Default Values
 *
 * Default values for all application settings, used during reset operations
 * and as fallbacks for missing values during import.
 */

import { TUNING_PRESETS } from "@/app/guitar/tuningConstants";
import {
  GlobalConfig,
  GuitarSettings,
} from "@/features/settings/types/settings.types";

/**
 * Default values for globalConfig slice
 * Mirrors the initialState in globalConfigSlice.ts
 */
export const globalConfigDefaults: GlobalConfig = {
  isDarkMode: true, // Dark mode is default
  instrument: "piano",
  scale: {
    root: "A",
    type: "major",
    mode: "ionian",
  },
  scaleRoot: TUNING_PRESETS[0],
  showFlats: false,
  highlightRoots: true,
  showDegrees: false,
};

/**
 * Default values for guitar-specific settings
 * Mirrors the defaults used in guitar hooks
 */
export const guitarDefaults: GuitarSettings = {
  customTunings: [],
  currentTuning: TUNING_PRESETS[0],
  fretCount: 24,
  flipX: false,
  flipY: false,
  baseTuning: 0,
};

/**
 * Application version for export files
 * This should match the version in package.json
 */
export const APP_VERSION = "0.1.0";

/**
 * Maximum allowed file size for import (10MB)
 */
export const MAX_IMPORT_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

/**
 * Default filename for exported settings
 */
export const DEFAULT_EXPORT_FILENAME = "scalesviewer-settings";

/**
 * Get a complete default settings object for reset operations
 */
export function getDefaultSettings(): {
  globalConfig: GlobalConfig;
  guitarSettings: GuitarSettings;
} {
  return {
    globalConfig: { ...globalConfigDefaults },
    guitarSettings: { ...guitarDefaults },
  };
}
