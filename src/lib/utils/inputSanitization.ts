// Input sanitization and validation utilities

/**
 * Sanitizes a string by removing potentially harmful characters
 */
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>\"'&]/g, '') // Remove HTML/script injection characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validates a tuning or scale name. `error`, when present, is an i18n key
 * (under the `validation` namespace) for the caller to translate with `t()`,
 * not display text.
 */
export const validateTuningName = (name: string): { isValid: boolean; error: string } => {
  const sanitized = sanitizeString(name);

  if (!sanitized) {
    return { isValid: false, error: 'validation.nameRequired' };
  }

  if (sanitized.length > 50) {
    return { isValid: false, error: 'validation.nameTooLong' };
  }

  if (!/^[a-zA-Z0-9\s\-_#♭♯]+$/.test(sanitized)) {
    return { isValid: false, error: 'validation.nameInvalidChars' };
  }

  return { isValid: true, error: '' };
};

/**
 * Safely parses localStorage JSON with error handling
 */
export const safeParseJSON = <T>(jsonString: string | null, fallback: T): T => {
  if (!jsonString) return fallback;
  
  try {
    const parsed = JSON.parse(jsonString);
    return parsed !== null ? parsed : fallback;
  } catch (error) {
    console.warn('Failed to parse localStorage JSON:', error);
    return fallback;
  }
};

/**
 * Safely stores data to localStorage with error handling
 */
export const safeSetLocalStorage = (key: string, data: unknown): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};