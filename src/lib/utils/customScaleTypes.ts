/**
 * Custom Scale Definitions
 *
 * Provides support for user-defined custom scales stored in localStorage.
 * Follows the same pattern as custom tunings.
 */

/**
 * Custom scale definition with interval pattern
 */
export interface CustomScaleDefinition {
  id: string;          // e.g. "custom-abc123" — used as ScaleType value
  label: string;       // shown in dropdown
  group: string;       // shown as optgroup label, e.g. "Custom"
  intervals: number[]; // semitone offsets from root (same format as SCALE_PATTERNS)
}

/**
 * Load custom scales from localStorage
 *
 * @returns Array of custom scale definitions, or empty array if none exist
 */
export const getCustomScales = (): CustomScaleDefinition[] => {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem("custom-scales");
    if (saved) return JSON.parse(saved) as CustomScaleDefinition[];
  } catch (e) {
    console.error("Failed to load custom scales:", e);
  }

  return [];
};

// Module-level runtime registry (client-side only)
// Populated by Header.tsx via registerCustomScales()
let _runtimeCustomPatterns: Record<string, number[]> = {};

/**
 * Register custom scale patterns in the runtime registry
 * Called by Header.tsx whenever custom scales change
 *
 * @param defs - Array of custom scale definitions
 */
export function registerCustomScales(defs: CustomScaleDefinition[]): void {
  _runtimeCustomPatterns = Object.fromEntries(defs.map((d) => [d.id, d.intervals]));
}

/**
 * Get the runtime registry of custom scale patterns
 * Used by getScaleNotes() to resolve custom scale intervals
 *
 * @returns Object mapping custom scale IDs to their interval patterns
 */
export function getCustomPatterns(): Readonly<Record<string, number[]>> {
  return _runtimeCustomPatterns;
}
