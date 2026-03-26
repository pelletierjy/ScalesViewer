/**
 * Settings Export/Import/Reset Type Definitions
 *
 * TypeScript interfaces for the settings management feature.
 */

import { TuningPreset } from "@/app/guitar/types/tuningPreset";
import { Instrument } from "@/lib/utils/instrument";
import { Scale } from "@/lib/utils/scaleType";
import { CustomScaleDefinition } from "@/lib/utils/customScaleTypes";

// ============================================================================
// Core Settings Types
// ============================================================================

/**
 * Complete export format containing all user settings
 */
export interface SettingsExport {
  version: string;
  exportedAt: string;
  reduxState?: {
    globalConfig?: GlobalConfig;
    applicationState?: ApplicationState;
    audio?: AudioState;
    selectedNote?: SelectedNoteState;
  };
  guitarSettings?: GuitarSettings;
}

/**
 * Partial export format for import operations (all fields optional)
 */
export type SettingsImport = Partial<SettingsExport>;

/**
 * Guitar-specific settings stored in localStorage
 */
export interface GuitarSettings {
  customTunings?: TuningPresetWithMetadata[];
  customScales?: CustomScaleDefinition[];
  currentTuning?: TuningPresetWithMetadata;
  fretCount?: number;
  flipX?: boolean;
  flipY?: boolean;
  baseTuning?: number;
}

// ============================================================================
// Redux State Types
// ============================================================================

export interface GlobalConfig {
  isDarkMode: boolean;
  instrument: Instrument;
  scale: Scale;
  scaleRoot: TuningPreset;
  showFlats: boolean;
  highlightRoots: boolean;
  showDegrees: boolean;
}

export interface ApplicationState {
  initialized: boolean;
}

export interface AudioState {
  enabled: boolean;
  volume: number;
}

export interface SelectedNoteState {
  note: string | null;
  octave: number | null;
}

export interface TuningPresetWithMetadata extends TuningPreset {
  category?: string;
  description?: string;
}

// ============================================================================
// Options Types
// ============================================================================

/**
 * Options for exportSettings function
 */
export interface ExportOptions {
  filename?: string;
  includeGuitarSettings?: boolean;
  includeReduxState?: boolean;
}

/**
 * Options for importSettings function
 */
export interface ImportOptions {
  mergeStrategy?: "overwrite" | "merge";
  validateVersion?: boolean;
}

// ============================================================================
// Result Types
// ============================================================================

/**
 * Result of an export operation
 */
export interface ExportResult {
  success: boolean;
  filename: string;
  data: SettingsExport;
  error?: string;
}

/**
 * Result of an import operation
 */
export interface ImportResult {
  success: boolean;
  applied: string[];
  skipped: string[];
  error?: string;
}

/**
 * Result of a reset operation
 */
export interface ResetResult {
  success: boolean;
  cleared: string[];
  error?: string;
}

/**
 * Result of validation
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// Hook Return Types
// ============================================================================

/**
 * Return type of useSettingsManager hook
 */
export interface UseSettingsManagerReturn {
  // Export
  exportSettings: (options?: ExportOptions) => Promise<ExportResult>;
  isExporting: boolean;

  // Import
  importSettings: (file: File, options?: ImportOptions) => Promise<ImportResult>;
  isImporting: boolean;

  // Reset
  resetSettings: (requireConfirmation?: boolean) => Promise<ResetResult>;
  isResetting: boolean;

  // Error state
  error: string | null;
  clearError: () => void;
}

// ============================================================================
// localStorage Key Mapping
// ============================================================================

/**
 * Known localStorage keys used by the application
 */
export const LOCAL_STORAGE_KEYS = {
  // Redux state
  STATE: "state",

  // Guitar-specific keys
  CUSTOM_TUNINGS: "custom-tunings",
  CUSTOM_SCALES: "custom-scales",
  CURRENT_SCALE_ROOT: "current-scaleRoot",
  FRET_COUNT: "fretCount",
  FLIP_X: "flipX",
  FLIP_Y: "flipY",
  BASE_TUNING: "baseTuning",
} as const;

/**
 * Array of all known localStorage keys
 */
export const ALL_LOCAL_STORAGE_KEYS = Object.values(LOCAL_STORAGE_KEYS);
