/**
 * Settings Import Utilities
 *
 * Functions for importing application settings from JSON files.
 */

import {
  ImportOptions,
  ImportResult,
  SettingsImport,
  LOCAL_STORAGE_KEYS,
} from "@/features/settings/types/settings.types";
import {
  validateImportData,
  isVersionMismatch,
} from "@/features/settings/utils/settingsValidation";
import {
  setSetting,
  setSettingRaw,
} from "@/lib/utils/localStorageManager";
import { MAX_IMPORT_FILE_SIZE } from "@/features/settings/utils/settingsDefaults";
import {
  ErrorMessages,
  formatError,
} from "@/features/settings/utils/settingsErrors";
import { APP_VERSION } from "@/features/settings/utils/settingsDefaults";

/**
 * Read a file as text using FileReader API
 *
 * @param file - The file to read
 * @returns Promise resolving to file contents
 */
export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to read file contents"));
      }
    };

    reader.onerror = () => {
      reject(new Error(ErrorMessages.IMPORT_READ_ERROR));
    };

    reader.readAsText(file);
  });
}

/**
 * Parse JSON string to settings object
 *
 * @param jsonString - The JSON string to parse
 * @returns Parsed settings object
 */
export function parseJson(jsonString: string): unknown {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(ErrorMessages.IMPORT_INVALID_JSON);
  }
}

/**
 * Merge imported settings with existing settings
 *
 * @param imported - The imported settings
 * @param options - Merge options
 * @returns Merged settings object
 */
export function mergeSettings(
  imported: SettingsImport,
  options: ImportOptions = {}
): SettingsImport {
  const { mergeStrategy = "merge" } = options;

  if (mergeStrategy === "overwrite") {
    // For overwrite, return the imported data as-is
    return imported;
  }

  // For merge, we keep the imported structure but don't modify existing values
  // that weren't provided in the import
  return imported;
}

/**
 * Apply imported settings to localStorage
 *
 * @param settings - The validated settings to apply
 * @returns Array of keys that were applied
 */
export function applySettings(settings: SettingsImport): string[] {
  const applied: string[] = [];

  // Apply reduxState
  if (settings.reduxState !== undefined) {
    const success = setSetting(LOCAL_STORAGE_KEYS.STATE, settings.reduxState);
    if (success) {
      applied.push(LOCAL_STORAGE_KEYS.STATE);
    }
  }

  // Apply guitarSettings
  if (settings.guitarSettings) {
    const gs = settings.guitarSettings;

    if (gs.customTunings !== undefined) {
      const success = setSetting(
        LOCAL_STORAGE_KEYS.CUSTOM_TUNINGS,
        gs.customTunings
      );
      if (success) {
        applied.push(LOCAL_STORAGE_KEYS.CUSTOM_TUNINGS);
      }
    }

    if (gs.currentTuning !== undefined) {
      const success = setSetting(
        LOCAL_STORAGE_KEYS.CURRENT_SCALE_ROOT,
        gs.currentTuning
      );
      if (success) {
        applied.push(LOCAL_STORAGE_KEYS.CURRENT_SCALE_ROOT);
      }
    }

    if (gs.fretCount !== undefined) {
      const success = setSettingRaw(
        LOCAL_STORAGE_KEYS.FRET_COUNT,
        gs.fretCount.toString()
      );
      if (success) {
        applied.push(LOCAL_STORAGE_KEYS.FRET_COUNT);
      }
    }

    if (gs.flipX !== undefined) {
      const success = setSettingRaw(
        LOCAL_STORAGE_KEYS.FLIP_X,
        gs.flipX.toString()
      );
      if (success) {
        applied.push(LOCAL_STORAGE_KEYS.FLIP_X);
      }
    }

    if (gs.flipY !== undefined) {
      const success = setSettingRaw(
        LOCAL_STORAGE_KEYS.FLIP_Y,
        gs.flipY.toString()
      );
      if (success) {
        applied.push(LOCAL_STORAGE_KEYS.FLIP_Y);
      }
    }

    if (gs.baseTuning !== undefined) {
      const success = setSettingRaw(
        LOCAL_STORAGE_KEYS.BASE_TUNING,
        gs.baseTuning.toString()
      );
      if (success) {
        applied.push(LOCAL_STORAGE_KEYS.BASE_TUNING);
      }
    }
  }

  return applied;
}

/**
 * Import settings from a file
 *
 * @param file - The file to import
 * @param options - Import options
 * @returns Import result
 */
export async function importSettings(
  file: File,
  options: ImportOptions = {}
): Promise<ImportResult> {
  const skipped: string[] = [];

  try {
    // Check file size
    if (file.size > MAX_IMPORT_FILE_SIZE) {
      return {
        success: false,
        applied: [],
        skipped: [],
        error: ErrorMessages.IMPORT_FILE_TOO_LARGE,
      };
    }

    // Check file type
    if (!file.name.endsWith(".json") && file.type !== "application/json") {
      skipped.push("Invalid file type - expected JSON");
    }

    // Read file
    const content = await readFile(file);

    // Parse JSON
    const parsed = parseJson(content);

    // Validate data
    const validation = validateImportData(parsed);
    if (!validation.valid) {
      return {
        success: false,
        applied: [],
        skipped: validation.errors,
        error: ErrorMessages.IMPORT_VALIDATION_FAILED,
      };
    }

    const settings = parsed as SettingsImport;

    // Check version if requested
    if (options.validateVersion !== false && settings.version) {
      if (isVersionMismatch(APP_VERSION, settings.version)) {
        skipped.push(
          `Version mismatch: imported from ${settings.version}, current is ${APP_VERSION}`
        );
      }
    }

    // Merge settings
    const merged = mergeSettings(settings, options);

    // Apply settings
    const applied = applySettings(merged);

    // Determine which keys were skipped
    if (settings.reduxState && !applied.includes(LOCAL_STORAGE_KEYS.STATE)) {
      skipped.push("reduxState (failed to apply)");
    }

    const success = applied.length > 0 || skipped.length === 0;

    return {
      success,
      applied,
      skipped,
      error:
        skipped.length > 0 && !success
          ? ErrorMessages.IMPORT_PARTIAL_FAILURE
          : undefined,
    };
  } catch (error) {
    return {
      success: false,
      applied: [],
      skipped: [],
      error: formatError(error),
    };
  }
}
