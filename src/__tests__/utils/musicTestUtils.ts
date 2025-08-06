/**
 * Comprehensive music theory test utilities for ScalesViewer
 * Provides constants, helpers, and custom matchers for testing music calculations
 */

import { Note } from '../../lib/utils/note';
import { Scale, ScaleMode } from '../../lib/utils/scaleType';

// ==================== CONSTANTS ====================

/**
 * All chromatic notes in both sharp and flat forms
 */
export const ALL_NOTES: Note[] = [
  'A', 'A#', 'Ab', 'B', 'Bb', 'C', 'C#', 'Db', 
  'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#'
];

/**
 * Chromatic notes in sharp form only (12 semitones)
 */
export const CHROMATIC_SHARP_NOTES: Note[] = [
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'
];

/**
 * Enharmonic equivalent pairs for testing note equivalencies
 */
export const ENHARMONIC_PAIRS: [Note, Note][] = [
  ['C#', 'Db'],
  ['D#', 'Eb'],
  ['F#', 'Gb'],
  ['G#', 'Ab'],
  ['A#', 'Bb']
];

/**
 * Standard 6-string guitar tuning (low to high)
 */
export const STANDARD_6_STRING_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

/**
 * Common guitar tunings for testing
 */
export const COMMON_TUNINGS = {
  standard6: ['E', 'A', 'D', 'G', 'B', 'E'] as Note[],
  dropD: ['D', 'A', 'D', 'G', 'B', 'E'] as Note[],
  openG: ['D', 'G', 'D', 'G', 'B', 'D'] as Note[],
  dadgad: ['D', 'A', 'D', 'G', 'A', 'D'] as Note[],
  standard7: ['B', 'E', 'A', 'D', 'G', 'B', 'E'] as Note[],
  standard8: ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E'] as Note[]
} as const;

/**
 * Reference frequencies for testing audio calculations
 */
export const REFERENCE_FREQUENCIES = {
  A4: 440, // Concert pitch A440
  C4: 261.626, // Middle C
  E2: 82.407, // Low E (guitar 6th string)
  E4: 329.628, // High E (guitar 1st string)
} as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Creates a scale for testing with the given root and mode
 */
export function createScale(root: Note, mode: ScaleMode = 'ionian'): Scale {
  return {
    root,
    type: 'major',
    mode
  };
}

/**
 * Converts a note name to its semitone index (0-11) starting from A
 */
export function noteToSemitone(note: Note): number {
  const noteMap: Record<Note, number> = {
    'A': 0, 'A#': 1, 'Bb': 1,
    'B': 2,
    'C': 3, 'C#': 4, 'Db': 4,
    'D': 5, 'D#': 6, 'Eb': 6,
    'E': 7,
    'F': 8, 'F#': 9, 'Gb': 9,
    'G': 10, 'G#': 11, 'Ab': 11
  };
  
  return noteMap[note] ?? -1;
}

/**
 * Converts semitone index to note name (sharp preference)
 */
export function semitoneToNote(semitone: number, preferFlats = false): Note {
  const sharpNotes: Note[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  const flatNotes: Note[] = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
  
  const normalizedSemitone = ((semitone % 12) + 12) % 12;
  return preferFlats ? flatNotes[normalizedSemitone] : sharpNotes[normalizedSemitone];
}

/**
 * Checks if two notes are enharmonic equivalents
 */
export function areEnharmonicEquivalents(note1: Note, note2: Note): boolean {
  return noteToSemitone(note1) === noteToSemitone(note2);
}

/**
 * Calculates the interval in semitones between two notes
 */
export function calculateInterval(fromNote: Note, toNote: Note): number {
  const fromSemitone = noteToSemitone(fromNote);
  const toSemitone = noteToSemitone(toNote);
  return ((toSemitone - fromSemitone) + 12) % 12;
}

/**
 * Transposes a note by a given number of semitones
 */
export function transposeNote(note: Note, semitones: number, preferFlats = false): Note {
  const originalSemitone = noteToSemitone(note);
  const newSemitone = (originalSemitone + semitones + 120) % 12; // +120 to handle large negative numbers
  return semitoneToNote(newSemitone, preferFlats);
}

/**
 * Creates a mock tuning with specified string count
 */
export function createMockTuning(stringCount: number, startingNote: Note = 'E'): Note[] {
  const tuning: Note[] = [];
  const startSemitone = noteToSemitone(startingNote);
  
  for (let i = 0; i < stringCount; i++) {
    // Create a realistic tuning pattern (fourths and thirds)
    const intervals = [0, 5, 10, 3, 7, 0]; // E-A-D-G-B-E pattern extended
    const interval = intervals[i % intervals.length];
    const semitone = (startSemitone + interval * Math.floor(i / intervals.length)) % 12;
    tuning.push(semitoneToNote(semitone));
  }
  
  return tuning;
}

// ==================== CUSTOM JEST MATCHERS ====================

/**
 * Custom Jest matcher to check if two notes are enharmonic equivalents
 */
export function toBeEnharmonicWith(received: Note, expected: Note): { pass: boolean; message: () => string } {
  const pass = areEnharmonicEquivalents(received, expected);
  
  return {
    pass,
    message: () =>
      pass
        ? `Expected ${received} not to be enharmonic with ${expected}`
        : `Expected ${received} to be enharmonic with ${expected}`
  };
}

/**
 * Custom Jest matcher to check if a note is in a scale
 */
export function toBeInScale(received: Note, scale: Note[]): { pass: boolean; message: () => string } {
  const pass = scale.some(scaleNote => areEnharmonicEquivalents(received, scaleNote));
  
  return {
    pass,
    message: () => 
      pass 
        ? `Expected ${received} not to be in scale [${scale.join(', ')}]`
        : `Expected ${received} to be in scale [${scale.join(', ')}]`
  };
}

/**
 * Custom Jest matcher to validate frequency calculations within tolerance
 */
export function toBeCloseToFrequency(received: number, expected: number, tolerance = 0.01): { pass: boolean; message: () => string } {
  const pass = Math.abs(received - expected) <= tolerance;
  
  return {
    pass,
    message: () =>
      pass
        ? `Expected ${received} not to be close to ${expected} (within ${tolerance} Hz)`
        : `Expected ${received} to be close to ${expected} (within ${tolerance} Hz), but difference was ${Math.abs(received - expected)} Hz`
  };
}

// Export custom matchers for Jest setup
export const customMatchers = {
  toBeEnharmonicWith,
  toBeInScale,
  toBeCloseToFrequency
};

// Type declarations for custom matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeEnharmonicWith(expected: Note): R;
      toBeInScale(scale: Note[]): R;
      toBeCloseToFrequency(expected: number, tolerance?: number): R;
    }
  }
}