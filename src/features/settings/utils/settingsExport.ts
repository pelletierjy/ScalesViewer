/**
 * Settings Export Utilities
 *
 * Functions for gathering and exporting application settings to JSON files.
 */

import {
  ExportOptions,
  ExportResult,
  SettingsExport,
  LOCAL_STORAGE_KEYS,
} from "@/features/settings/types/settings.types";
import {
  getSetting,
  getSettingRaw,
  isLocalStorageAvailable,
} from "@/lib/utils/localStorageManager";
import {
  APP_VERSION,
  DEFAULT_EXPORT_FILENAME,
} from "@/features/settings/utils/settingsDefaults";
import { formatError } from "@/features/settings/utils/settingsErrors";
import { CustomScaleDefinition } from "@/lib/utils/customScaleTypes";

/**
 * Gather all application settings from localStorage
 *
 * @returns SettingsExport object containing all current settings
 */
export function gatherSettings(): SettingsExport {
  const now = new Date().toISOString();

  // Get Redux state
  const reduxState = getSetting<Record<string, unknown>>(
    LOCAL_STORAGE_KEYS.STATE
  );

  // Get guitar-specific settings
  const customTunings = getSetting(LOCAL_STORAGE_KEYS.CUSTOM_TUNINGS);
  const customScales = getSetting(LOCAL_STORAGE_KEYS.CUSTOM_SCALES);
  const currentTuning = getSetting(LOCAL_STORAGE_KEYS.CURRENT_SCALE_ROOT);
  const fretCountRaw = getSettingRaw(LOCAL_STORAGE_KEYS.FRET_COUNT);
  const flipXRaw = getSettingRaw(LOCAL_STORAGE_KEYS.FLIP_X);
  const flipYRaw = getSettingRaw(LOCAL_STORAGE_KEYS.FLIP_Y);
  const baseTuningRaw = getSettingRaw(LOCAL_STORAGE_KEYS.BASE_TUNING);

  // Build guitar settings object
  const guitarSettings: SettingsExport["guitarSettings"] = {};

  if (customTunings !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guitarSettings.customTunings = customTunings as any;
  }
  if (customScales !== null) {
    guitarSettings.customScales = customScales as CustomScaleDefinition[];
  }
  if (currentTuning !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guitarSettings.currentTuning = currentTuning as any;
  }
  if (fretCountRaw !== null) {
    const parsed = parseInt(fretCountRaw, 10);
    if (!isNaN(parsed)) {
      guitarSettings.fretCount = parsed;
    }
  }
  if (flipXRaw !== null) {
    guitarSettings.flipX = flipXRaw === "true";
  }
  if (flipYRaw !== null) {
    guitarSettings.flipY = flipYRaw === "true";
  }
  if (baseTuningRaw !== null) {
    const parsed = parseInt(baseTuningRaw, 10);
    if (!isNaN(parsed)) {
      guitarSettings.baseTuning = parsed;
    }
  }

  const exportData: SettingsExport = {
    version: APP_VERSION,
    exportedAt: now,
  };

  // Only include sections that have data
  if (reduxState !== null && Object.keys(reduxState).length > 0) {
    exportData.reduxState = reduxState;
  }

  if (Object.keys(guitarSettings).length > 0) {
    exportData.guitarSettings = guitarSettings;
  }

  return exportData;
}

/**
 * Create a Blob from settings data for file download
 *
 * @param data - The settings data to serialize
 * @returns Blob containing JSON data
 */
export function createExportBlob(data: SettingsExport): Blob {
  const jsonString = JSON.stringify(data, null, 2);
  return new Blob([jsonString], { type: "application/json" });
}

/**
 * Generate a filename for the export
 *
 * @param customFilename - Optional custom filename base
 * @returns Full filename with timestamp
 */
export function generateFilename(customFilename?: string): string {
  const base = customFilename || DEFAULT_EXPORT_FILENAME;
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${base}-${timestamp}.json`;
}

/**
 * Trigger a file download in the browser
 *
 * @param blob - The blob to download
 * @param filename - The filename for the download
 */
export function triggerDownload(blob: Blob, filename: string): void {
  // Create a temporary URL for the blob
  const url = URL.createObjectURL(blob);

  try {
    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // Append to body, click, and remove
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  } catch (error) {
    // Clean up on error
    URL.revokeObjectURL(url);
    throw error;
  }
}

/**
 * Export settings to a JSON file
 *
 * @param options - Export configuration options
 * @returns Promise resolving to export result
 */
export async function exportSettings(
  options: ExportOptions = {}
): Promise<ExportResult> {
  // Check if localStorage is available
  if (!isLocalStorageAvailable()) {
    return {
      success: false,
      filename: generateFilename(options.filename),
      data: { version: APP_VERSION, exportedAt: new Date().toISOString() },
      error: "Browser storage is not available.",
    };
  }

  try {
    // Gather settings
    const data = gatherSettings();

    // Filter data based on options if specified
    const filteredData: SettingsExport = {
      version: data.version,
      exportedAt: data.exportedAt,
    };

    if (options.includeReduxState !== false && data.reduxState) {
      filteredData.reduxState = data.reduxState;
    }

    if (options.includeGuitarSettings !== false && data.guitarSettings) {
      filteredData.guitarSettings = data.guitarSettings;
    }

    // Create blob
    const blob = createExportBlob(filteredData);

    // Generate filename
    const filename = generateFilename(options.filename);

    // Trigger download
    triggerDownload(blob, filename);

    return {
      success: true,
      filename,
      data: filteredData,
    };
  } catch (error) {
    return {
      success: false,
      filename: generateFilename(options.filename),
      data: { version: APP_VERSION, exportedAt: new Date().toISOString() },
      error: formatError(error),
    };
  }
}
