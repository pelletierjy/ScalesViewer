/**
 * Settings Export/Import/Reset API Contracts
 *
 * These are not HTTP API contracts but rather the programmatic interface
 * for the settings management functionality.
 */

// ============================================================================
// Types
// ============================================================================

export interface SettingsExport {
  version: string;
  exportedAt: string;
  reduxState?: {
    globalConfig?: GlobalConfig;
    applicationState?: ApplicationState;
    audio?: AudioState;
    selectedNote?: SelectedNoteState;
  };
  guitarSettings?: {
    customTunings?: TuningPresetWithMetadata[];
    currentTuning?: TuningPresetWithMetadata;
    fretCount?: number;
    flipX?: boolean;
    flipY?: boolean;
    baseTuning?: number;
  };
}

export type SettingsImport = Partial<SettingsExport>;

export interface ExportOptions {
  filename?: string;
  includeGuitarSettings?: boolean;
  includeReduxState?: boolean;
}

export interface ImportOptions {
  mergeStrategy?: 'overwrite' | 'merge';  // Default: 'merge'
  validateVersion?: boolean;              // Default: true
}

export interface ExportResult {
  success: boolean;
  filename: string;
  data: SettingsExport;
  error?: string;
}

export interface ImportResult {
  success: boolean;
  applied: string[];      // List of keys that were updated
  skipped: string[];      // List of keys that were skipped (invalid/unknown)
  error?: string;
}

export interface ResetResult {
  success: boolean;
  cleared: string[];      // List of keys that were cleared
  error?: string;
}

// ============================================================================
// Function Contracts
// ============================================================================

/**
 * Export all settings to a JSON file
 *
 * @param options - Export configuration options
 * @returns Promise resolving to export result
 *
 * @example
 * const result = await exportSettings({
 *   filename: 'my-backup.json'
 * });
 * if (result.success) {
 *   console.log(`Exported to ${result.filename}`);
 * }
 */
export declare function exportSettings(
  options?: ExportOptions
): Promise<ExportResult>;

/**
 * Import settings from a JSON file
 *
 * @param file - File object from file input
 * @param options - Import configuration options
 * @returns Promise resolving to import result
 *
 * @example
 * const result = await importSettings(file, {
 *   mergeStrategy: 'merge'
 * });
 * if (result.success) {
 *   console.log(`Applied ${result.applied.length} settings`);
 * }
 */
export declare function importSettings(
  file: File,
  options?: ImportOptions
): Promise<ImportResult>;

/**
 * Reset all settings to defaults
 *
 * @param requireConfirmation - Whether to show confirmation dialog
 * @returns Promise resolving to reset result
 *
 * @example
 * const confirmed = await showConfirmDialog('Reset all settings?');
 * if (confirmed) {
 *   const result = await resetSettings(false);
 *   if (result.success) {
 *     window.location.reload();
 *   }
 * }
 */
export declare function resetSettings(
  requireConfirmation?: boolean
): Promise<ResetResult>;

/**
 * Validate settings import data
 *
 * @param data - Parsed JSON data to validate
 * @returns Validation result with details
 *
 * @example
 * const validation = validateImportData(parsedJson);
 * if (!validation.valid) {
 *   console.error(validation.errors);
 * }
 */
export declare function validateImportData(
  data: unknown
): {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

/**
 * Get current settings for export
 *
 * @returns Current settings snapshot
 */
export declare function getCurrentSettings(): SettingsExport;

/**
 * Apply imported settings to localStorage
 *
 * @param settings - Validated settings to apply
 * @returns Array of applied keys
 */
export declare function applySettings(
  settings: SettingsImport
): string[];

// ============================================================================
// Supporting Types (from existing codebase)
// ============================================================================

interface GlobalConfig {
  isDarkMode: boolean;
  instrument: 'piano' | 'guitar' | 'kalimba' | 'harmonica';
  scale: Scale;
  scaleRoot: TuningPreset;
  showFlats: boolean;
  highlightRoots: boolean;
  showDegrees: boolean;
}

interface Scale {
  root: string;
  type: string;
  mode: string;
}

interface TuningPreset {
  name: string;
  notes: string[];
}

interface TuningPresetWithMetadata extends TuningPreset {
  category?: string;
  description?: string;
}

// Placeholder types for other state slices
interface ApplicationState {
  initialized: boolean;
  // ... other fields
}

interface AudioState {
  enabled: boolean;
  volume: number;
  // ... other fields
}

interface SelectedNoteState {
  note: string | null;
  octave: number | null;
  // ... other fields
}
