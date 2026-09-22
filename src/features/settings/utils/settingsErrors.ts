/**
 * Settings Error Handling Utilities
 *
 * These modules run outside React (plain functions, no hook access), so they
 * can't call next-intl's `useTranslations()` themselves. Everything below is
 * an i18n KEY under the `error/success` namespace, not display text — the
 * React layer (useSettingsManager, and the panel/button components) is
 * responsible for translating it with `t()` before rendering.
 */

// ============================================================================
// Error Messages (i18n keys, see src/lib/i18n/messages/*.json → "error")
// ============================================================================

export const ErrorMessages = {
  // Export errors
  EXPORT_NO_DATA: "error.exportNoData",
  EXPORT_SERIALIZE: "error.exportSerialize",
  EXPORT_BROWSER_BLOCK: "error.exportBrowserBlock",
  EXPORT_STORAGE_FULL: "error.exportStorageFull",

  // Import errors
  IMPORT_FILE_TOO_LARGE: "error.importFileTooLarge",
  IMPORT_INVALID_JSON: "error.importInvalidJson",
  IMPORT_INVALID_FORMAT: "error.importInvalidFormat",
  IMPORT_READ_ERROR: "error.importReadError",
  IMPORT_VALIDATION_FAILED: "error.importValidationFailed",
  IMPORT_STORAGE_FULL: "error.importStorageFull",
  IMPORT_VERSION_MISMATCH: "error.importVersionMismatch",
  IMPORT_PARTIAL_FAILURE: "error.importPartialFailure",

  // Reset errors
  RESET_CANCELLED: "error.resetCancelled",
  RESET_CLEAR_FAILED: "error.resetClearFailed",

  // Generic errors
  UNKNOWN_ERROR: "error.unknownError",
  LOCAL_STORAGE_UNAVAILABLE: "error.localStorageUnavailable",
  OPERATION_IN_PROGRESS: "error.operationInProgress",
} as const;

// ============================================================================
// Success Messages (i18n keys, see src/lib/i18n/messages/*.json → "success")
// ============================================================================

export const SuccessMessages = {
  EXPORT_SUCCESS: "success.exportSuccess",
  IMPORT_SUCCESS: "success.importSuccess",
  RESET_SUCCESS: "success.resetSuccess",
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
 * Format an unknown error into an i18n key the caller can pass to `t()`.
 *
 * @param error - The error to format
 * @returns An i18n key under the `error` namespace
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    // Errors we throw ourselves (readFile/parseJson in settingsImport.ts)
    // already carry an i18n key as their message — pass it straight through
    // rather than re-guessing it from English substrings.
    if (error.message.startsWith("error.")) {
      return error.message;
    }
    if (isJsonError(error)) return ErrorMessages.IMPORT_INVALID_JSON;
    if (isStorageError(error)) return ErrorMessages.IMPORT_STORAGE_FULL;
    if (isFileError(error)) return ErrorMessages.IMPORT_READ_ERROR;
  }

  return ErrorMessages.UNKNOWN_ERROR;
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
    error: formatError(error),
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
    error: formatError(error),
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
    error: formatError(error),
  };
}
