/**
 * Settings Error Handling Utilities
 *
 * Error message constants and formatting helpers for export/import/reset operations.
 */

// ============================================================================
// Error Messages
// ============================================================================

export const ErrorMessages = {
  // Export errors
  EXPORT_NO_DATA: "No settings found to export.",
  EXPORT_SERIALIZE: "Failed to serialize settings data.",
  EXPORT_BROWSER_BLOCK: "Download was blocked by the browser. Please check your popup settings.",
  EXPORT_STORAGE_FULL: "Cannot export: localStorage is not accessible.",

  // Import errors
  IMPORT_FILE_TOO_LARGE: "The file is too large. Maximum size is 10MB.",
  IMPORT_INVALID_JSON: "The selected file is not valid JSON. Please check the file and try again.",
  IMPORT_INVALID_FORMAT: "Unrecognized settings format. Expected ScalesViewer settings file.",
  IMPORT_READ_ERROR: "Failed to read the file. Please try again.",
  IMPORT_VALIDATION_FAILED: "The file contains invalid settings data.",
  IMPORT_STORAGE_FULL: "Storage is full. Try clearing some browser data first.",
  IMPORT_VERSION_MISMATCH: "Warning: This settings file was exported from a different app version.",
  IMPORT_PARTIAL_FAILURE: "Some settings could not be imported. See details for more information.",

  // Reset errors
  RESET_CANCELLED: "Reset cancelled by user.",
  RESET_CLEAR_FAILED: "Failed to clear some settings. Please clear browser data manually.",

  // Generic errors
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  LOCAL_STORAGE_UNAVAILABLE: "Browser storage is not available. Please check your browser settings.",
  OPERATION_IN_PROGRESS: "Another operation is already in progress. Please wait.",
} as const;

// ============================================================================
// Success Messages
// ============================================================================

export const SuccessMessages = {
  EXPORT_SUCCESS: (filename: string) => `Settings exported successfully to ${filename}`,
  IMPORT_SUCCESS: (count: number) => `Successfully imported ${count} settings.`,
  RESET_SUCCESS: "Settings reset to defaults. The page will reload.",
} as const;

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if error is a File-related error
 */
export function isFileError(error: unknown): boolean {
  return error instanceof Error && (
    error.name === "NotFoundError" ||
    error.name === "SecurityError" ||
    error.name === "NotAllowedError"
  );
}

/**
 * Check if error is a Storage-related error (QuotaExceeded)
 */
export function isStorageError(error: unknown): boolean {
  return error instanceof Error && (
    error.name === "QuotaExceededError" ||
    error.message?.toLowerCase().includes("quota") ||
    error.message?.toLowerCase().includes("storage")
  );
}

/**
 * Check if error is a JSON parsing error
 */
export function isJsonError(error: unknown): boolean {
  return error instanceof SyntaxError ||
    (error instanceof Error && error.message?.includes("JSON"));
}

// ============================================================================
// Error Formatting
// ============================================================================

/**
 * Format an error into a user-friendly message
 *
 * @param error - The error to format
 * @param context - Optional context about where the error occurred
 * @returns A user-friendly error message
 */
export function formatError(error: unknown, context?: string): string {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = ErrorMessages.UNKNOWN_ERROR;
  }

  // Map specific error patterns to user-friendly messages
  if (isJsonError(error)) {
    message = ErrorMessages.IMPORT_INVALID_JSON;
  } else if (isStorageError(error)) {
    message = ErrorMessages.IMPORT_STORAGE_FULL;
  } else if (isFileError(error)) {
    message = ErrorMessages.IMPORT_READ_ERROR;
  }

  if (context) {
    return `${context}: ${message}`;
  }

  return message;
}

/**
 * Create an error result object for export operations
 */
export function createExportError(filename: string, error: unknown): {
  success: false;
  filename: string;
  data: never;
  error: string;
} {
  return {
    success: false,
    filename,
    data: null as never,
    error: formatError(error, "Export failed"),
  };
}

/**
 * Create an error result object for import operations
 */
export function createImportError(error: unknown): {
  success: false;
  applied: string[];
  skipped: string[];
  error: string;
} {
  return {
    success: false,
    applied: [],
    skipped: [],
    error: formatError(error, "Import failed"),
  };
}

/**
 * Create an error result object for reset operations
 */
export function createResetError(error: unknown): {
  success: false;
  cleared: string[];
  error: string;
} {
  return {
    success: false,
    cleared: [],
    error: formatError(error, "Reset failed"),
  };
}
