/**
 * Settings Validation Utilities
 *
 * Provides validation functions for import data and settings values.
 */

import {
  GuitarSettings,
  SettingsImport,
  TuningPresetWithMetadata,
  ValidationResult,
} from "@/features/settings/types/settings.types";
import { TUNING_PRESETS } from "@/app/guitar/tuningConstants";
import { Instrument } from "@/lib/utils/instrument";
import { Scale } from "@/lib/utils/scaleType";
import { CustomScaleDefinition } from "@/lib/utils/customScaleTypes";

/**
 * Valid instrument values
 */
const VALID_INSTRUMENTS: Instrument[] = [
  "piano",
  "guitar",
  "kalimba",
  "harmonica",
];

/**
 * Valid note names (including sharps and flats)
 */
const VALID_NOTES = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "G#",
  "Ab",
  "A",
  "A#",
  "Bb",
  "B",
];

/**
 * Valid scale types
 */
const VALID_SCALE_TYPES = [
  "major",
  "minor",
  "pentatonic",
  "blues",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "aeolian",
  "locrian",
  "harmonicMinor",
  "melodicMinor",
  "wholeTone",
  "diminished",
  "chromatic",
];

/**
 * Valid mode names
 */
const VALID_MODES = [
  "ionian",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "aeolian",
  "locrian",
];

/**
 * Validate a complete settings import object
 *
 * @param data - The data to validate
 * @returns ValidationResult with valid flag and any errors/warnings
 */
export function validateImportData(data: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (data === null || typeof data !== "object") {
    return {
      valid: false,
      errors: ["Invalid data format: expected an object"],
      warnings: [],
    };
  }

  const importData = data as SettingsImport;

  // Validate version if present
  if ("version" in importData) {
    if (typeof importData.version !== "string") {
      errors.push("Invalid version: expected a string");
    } else if (!isValidSemver(importData.version)) {
      warnings.push(`Version "${importData.version}" may not be a valid semver`);
    }
  }

  // Validate exportedAt if present
  if ("exportedAt" in importData) {
    if (typeof importData.exportedAt !== "string") {
      errors.push("Invalid exportedAt: expected a string");
    } else if (isNaN(Date.parse(importData.exportedAt))) {
      warnings.push(`exportedAt "${importData.exportedAt}" is not a valid date`);
    }
  }

  // Validate reduxState if present
  if ("reduxState" in importData && importData.reduxState !== undefined) {
    const reduxValidation = validateReduxState(importData.reduxState);
    errors.push(...reduxValidation.errors);
    warnings.push(...reduxValidation.warnings);
  }

  // Validate guitarSettings if present
  if (
    "guitarSettings" in importData &&
    importData.guitarSettings !== undefined
  ) {
    const guitarValidation = validateGuitarSettings(importData.guitarSettings);
    errors.push(...guitarValidation.errors);
    warnings.push(...guitarValidation.warnings);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate reduxState portion of import
 */
function validateReduxState(
  reduxState: unknown
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (typeof reduxState !== "object" || reduxState === null) {
    errors.push("Invalid reduxState: expected an object");
    return { errors, warnings };
  }

  const state = reduxState as Record<string, unknown>;

  // Validate globalConfig
  if ("globalConfig" in state && state.globalConfig !== undefined) {
    if (typeof state.globalConfig !== "object" || state.globalConfig === null) {
      errors.push("Invalid globalConfig: expected an object");
    } else {
      const gcErrors = validateGlobalConfig(state.globalConfig);
      errors.push(...gcErrors);
    }
  }

  return { errors, warnings };
}

/**
 * Validate globalConfig object
 */
function validateGlobalConfig(globalConfig: unknown): string[] {
  const errors: string[] = [];

  if (typeof globalConfig !== "object" || globalConfig === null) {
    return ["Invalid globalConfig: expected an object"];
  }

  const gc = globalConfig as Record<string, unknown>;

  // Validate isDarkMode
  if ("isDarkMode" in gc && typeof gc.isDarkMode !== "boolean") {
    errors.push("Invalid globalConfig.isDarkMode: expected boolean");
  }

  // Validate instrument
  if ("instrument" in gc) {
    if (!isValidInstrument(gc.instrument)) {
      errors.push(
        `Invalid instrument: "${gc.instrument}". Valid values: ${VALID_INSTRUMENTS.join(", ")}`
      );
    }
  }

  // Validate scale
  if ("scale" in gc && gc.scale !== undefined) {
    if (typeof gc.scale !== "object" || gc.scale === null) {
      errors.push("Invalid scale: expected an object");
    } else {
      const scale = gc.scale as Record<string, unknown>;

      if ("root" in scale && !isValidNote(scale.root)) {
        errors.push(`Invalid scale root: "${scale.root}"`);
      }

      if ("type" in scale && !isValidScaleType(scale.type)) {
        errors.push(
          `Invalid scale type: "${scale.type}". Expected a non-empty string`
        );
      }

      if ("mode" in scale && !isValidMode(scale.mode)) {
        errors.push(
          `Invalid scale mode: "${scale.mode}". Valid values: ${VALID_MODES.join(", ")}`
        );
      }
    }
  }

  // Validate scaleRoot
  if ("scaleRoot" in gc && gc.scaleRoot !== undefined) {
    if (!isValidTuningPreset(gc.scaleRoot)) {
      errors.push("Invalid scaleRoot: expected a tuning preset object with name and notes");
    }
  }

  // Validate showFlats
  if ("showFlats" in gc && typeof gc.showFlats !== "boolean") {
    errors.push("Invalid globalConfig.showFlats: expected boolean");
  }

  // Validate highlightRoots
  if ("highlightRoots" in gc && typeof gc.highlightRoots !== "boolean") {
    errors.push("Invalid globalConfig.highlightRoots: expected boolean");
  }

  // Validate showDegrees
  if ("showDegrees" in gc && typeof gc.showDegrees !== "boolean") {
    errors.push("Invalid globalConfig.showDegrees: expected boolean");
  }

  return errors;
}

/**
 * Validate a custom scale definition
 */
function isValidCustomScaleDefinition(value: unknown): value is CustomScaleDefinition {
  if (typeof value !== "object" || value === null) return false;
  const cs = value as Record<string, unknown>;
  return (
    typeof cs.id === "string" && cs.id.length > 0 &&
    typeof cs.label === "string" && cs.label.length > 0 &&
    typeof cs.group === "string" && cs.group.length > 0 &&
    Array.isArray(cs.intervals) &&
    (cs.intervals as unknown[]).every((i) => typeof i === "number" && i >= 0 && i <= 11)
  );
}

/**
 * Validate guitarSettings portion of import
 */
function validateGuitarSettings(
  guitarSettings: unknown
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (typeof guitarSettings !== "object" || guitarSettings === null) {
    errors.push("Invalid guitarSettings: expected an object");
    return { errors, warnings };
  }

  const gs = guitarSettings as Record<string, unknown>;

  // Validate customTunings
  if ("customTunings" in gs && gs.customTunings !== undefined) {
    if (!Array.isArray(gs.customTunings)) {
      errors.push("Invalid customTunings: expected an array");
    } else {
      gs.customTunings.forEach((tuning, index) => {
        if (!isValidTuningPreset(tuning)) {
          errors.push(`Invalid customTuning at index ${index}`);
        }
      });
    }
  }

  // Validate customScales
  if ("customScales" in gs && gs.customScales !== undefined) {
    if (!Array.isArray(gs.customScales)) {
      errors.push("Invalid customScales: expected an array");
    } else {
      gs.customScales.forEach((cs, index) => {
        if (!isValidCustomScaleDefinition(cs)) {
          errors.push(`Invalid customScale at index ${index}`);
        }
      });
    }
  }

  // Validate currentTuning
  if ("currentTuning" in gs && gs.currentTuning !== undefined) {
    if (!isValidTuningPreset(gs.currentTuning)) {
      errors.push("Invalid currentTuning: expected a tuning preset object");
    }
  }

  // Validate fretCount
  if ("fretCount" in gs && gs.fretCount !== undefined) {
    if (!isValidFretCount(gs.fretCount)) {
      errors.push(
        `Invalid fretCount: ${gs.fretCount}. Expected a number between 1 and 36`
      );
    }
  }

  // Validate flipX
  if ("flipX" in gs && typeof gs.flipX !== "boolean") {
    errors.push("Invalid flipX: expected boolean");
  }

  // Validate flipY
  if ("flipY" in gs && typeof gs.flipY !== "boolean") {
    errors.push("Invalid flipY: expected boolean");
  }

  // Validate baseTuning
  if ("baseTuning" in gs && gs.baseTuning !== undefined) {
    if (typeof gs.baseTuning !== "number" || gs.baseTuning < -12 || gs.baseTuning > 12) {
      errors.push(
        `Invalid baseTuning: ${gs.baseTuning}. Expected a number between -12 and 12`
      );
    }
  }

  return { errors, warnings };
}

/**
 * Check if value is a valid instrument
 */
export function isValidInstrument(value: unknown): value is Instrument {
  return typeof value === "string" && VALID_INSTRUMENTS.includes(value as Instrument);
}

/**
 * Check if value is a valid note name
 */
export function isValidNote(value: unknown): boolean {
  return typeof value === "string" && VALID_NOTES.includes(value);
}

/**
 * Check if value is a valid scale type
 * Accepts both hardcoded scale types and custom scale IDs from localStorage
 */
export function isValidScaleType(value: unknown): boolean {
  return typeof value === "string" && value.length > 0;
}

/**
 * Check if value is a valid mode
 */
export function isValidMode(value: unknown): boolean {
  return typeof value === "string" && VALID_MODES.includes(value);
}

/**
 * Check if value is a valid fret count
 */
export function isValidFretCount(value: unknown): value is number {
  return typeof value === "number" && value >= 1 && value <= 36;
}

/**
 * Check if value is a valid tuning preset
 */
export function isValidTuningPreset(value: unknown): value is TuningPresetWithMetadata {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const preset = value as Record<string, unknown>;

  // Must have a name (string)
  if (typeof preset.name !== "string" || preset.name.length === 0) {
    return false;
  }

  // Must have strings (array of strings)
  if (!Array.isArray(preset.strings)) {
    return false;
  }

  // All strings must be valid note names
  if (!preset.strings.every((note) => isValidNote(note))) {
    return false;
  }

  // Must have 4-18 strings (reasonable guitar range)
  if (preset.strings.length < 4 || preset.strings.length > 18) {
    return false;
  }

  return true;
}

/**
 * Check if value is a valid scale object
 */
export function isValidScale(value: unknown): value is Scale {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const scale = value as Record<string, unknown>;

  return (
    "root" in scale &&
    isValidNote(scale.root) &&
    "type" in scale &&
    typeof scale.type === "string" &&
    "mode" in scale &&
    typeof scale.mode === "string"
  );
}

/**
 * Check if string is a valid semver format
 */
function isValidSemver(version: string): boolean {
  // Basic semver check: major.minor.patch with optional prerelease
  const semverRegex = /^(\d+)\.(\d+)\.(\d+)(?:-[a-zA-Z0-9.-]+)?$/;
  return semverRegex.test(version);
}

/**
 * Check if two versions are significantly different
 * (major version difference indicates potential incompatibility)
 *
 * @param currentVersion - Current app version
 * @param importVersion - Version from imported file
 * @returns true if versions have different major version numbers
 */
export function isVersionMismatch(
  currentVersion: string,
  importVersion: string
): boolean {
  try {
    const currentMajor = parseInt(currentVersion.split(".")[0], 10);
    const importMajor = parseInt(importVersion.split(".")[0], 10);

    if (isNaN(currentMajor) || isNaN(importMajor)) {
      return false;
    }

    return currentMajor !== importMajor;
  } catch {
    return false;
  }
}
