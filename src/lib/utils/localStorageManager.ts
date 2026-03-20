/**
 * Centralized LocalStorage Manager
 *
 * Provides unified access to all localStorage operations used by the application.
 * This utility abstracts the storage layer for export/import/reset functionality.
 */

import {
  ALL_LOCAL_STORAGE_KEYS,
  LOCAL_STORAGE_KEYS,
} from "@/features/settings/types/settings.types";

/**
 * Get a single value from localStorage
 *
 * @param key - The localStorage key
 * @returns The parsed value, or null if not found/invalid
 */
export function getSetting<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Failed to get setting "${key}" from localStorage:`, error);
    return null;
  }
}

/**
 * Get a raw string value from localStorage (for non-JSON values)
 *
 * @param key - The localStorage key
 * @returns The raw string value, or null if not found
 */
export function getSettingRaw(key: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Failed to get raw setting "${key}" from localStorage:`, error);
    return null;
  }
}

/**
 * Set a value in localStorage
 *
 * @param key - The localStorage key
 * @param value - The value to store (will be JSON stringified)
 * @returns true if successful, false otherwise
 */
export function setSetting<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to set setting "${key}" in localStorage:`, error);
    return false;
  }
}

/**
 * Set a raw string value in localStorage (for non-JSON values like booleans stored as strings)
 *
 * @param key - The localStorage key
 * @param value - The raw string value to store
 * @returns true if successful, false otherwise
 */
export function setSettingRaw(key: string, value: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Failed to set raw setting "${key}" in localStorage:`, error);
    return false;
  }
}

/**
 * Remove a single key from localStorage
 *
 * @param key - The localStorage key to remove
 * @returns true if successful or key didn't exist, false on error
 */
export function removeSetting(key: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove setting "${key}" from localStorage:`, error);
    return false;
  }
}

/**
 * Get all known application settings from localStorage
 *
 * @returns Object with all known settings keyed by localStorage key name
 */
export function getAllSettings(): Record<string, unknown> {
  if (typeof window === "undefined") return {};

  const settings: Record<string, unknown> = {};

  for (const key of ALL_LOCAL_STORAGE_KEYS) {
    const value = getSetting(key);
    if (value !== null) {
      settings[key] = value;
    }
  }

  return settings;
}

/**
 * Clear all known application settings from localStorage
 *
 * @returns Object with list of cleared keys and any errors
 */
export function clearAllSettings(): { cleared: string[]; errors: string[] } {
  if (typeof window === "undefined") {
    return { cleared: [], errors: ["localStorage not available (server-side)"] };
  }

  const cleared: string[] = [];
  const errors: string[] = [];

  for (const key of ALL_LOCAL_STORAGE_KEYS) {
    try {
      localStorage.removeItem(key);
      cleared.push(key);
    } catch (error) {
      errors.push(`Failed to clear "${key}": ${error}`);
    }
  }

  return { cleared, errors };
}

/**
 * Check if localStorage is available and working
 *
 * @returns true if localStorage is available and writable
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const testKey = "__localStorage_test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the approximate size of localStorage usage in bytes
 *
 * @returns Size in bytes, or -1 if cannot be determined
 */
export function getLocalStorageSize(): number {
  if (typeof window === "undefined") return -1;

  try {
    let totalSize = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length * 2; // UTF-16 encoding = 2 bytes per char
      }
    }
    return totalSize;
  } catch {
    return -1;
  }
}

// Re-export the key constants for convenience
export { LOCAL_STORAGE_KEYS, ALL_LOCAL_STORAGE_KEYS };
