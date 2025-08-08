import { Note, NoteWithOctave } from "@/lib/utils/note";
import { calculateFretNote } from "@/lib/utils/scaleUtils";

// Standard guitar string octaves mapping
const STANDARD_OCTAVES: Record<Note, number> = {
  E: 4, // High E default
  B: 3,
  G: 3,
  D: 3,
  A: 2,
  C: 3,
  "C#": 3,
  Db: 3,
  "D#": 3,
  Eb: 3,
  F: 3,
  "F#": 3,
  Gb: 3,
  "G#": 3,
  Ab: 3,
  "A#": 2,
  Bb: 2,
};

// Note order for chromatic calculations
const CHROMATIC_NOTES = [
  "C", "C#", "D", "D#", "E", "F", 
  "F#", "G", "G#", "A", "A#", "B"
] as const;

/**
 * Get the base octave for a guitar string based on its position and note
 */
export function getBaseOctave(note: Note, stringIndex: number, totalStrings: number): number {
  // Standard guitar configurations with specific octave mappings
  if (totalStrings === 6) {
    // Standard 6-string guitar tuning: E4-B3-G3-D3-A2-E2 (high to low, indices 0-5)
    const standardOctaves = [4, 3, 3, 3, 2, 2]; // High E, B, G, D, A, Low E
    if (stringIndex < standardOctaves.length) {
      return standardOctaves[stringIndex];
    }
  }
  
  if (totalStrings === 7) {
    // 7-string guitar adds a low B string: E4-B3-G3-D3-A2-E2-B1
    const sevenStringOctaves = [4, 3, 3, 3, 2, 2, 1];
    if (stringIndex < sevenStringOctaves.length) {
      return sevenStringOctaves[stringIndex];
    }
  }
  
  if (totalStrings === 8) {
    // 8-string guitar adds F# below the low B: E4-B3-G3-D3-A2-E2-B1-F#1
    const eightStringOctaves = [4, 3, 3, 3, 2, 2, 1, 1];
    if (stringIndex < eightStringOctaves.length) {
      return eightStringOctaves[stringIndex];
    }
  }
  
  if (totalStrings === 4) {
    // 4-string bass: G3-D3-A2-E2 (high to low)
    const bassOctaves = [3, 3, 2, 2];
    if (stringIndex < bassOctaves.length) {
      return bassOctaves[stringIndex];
    }
  }

  // Fallback for unusual configurations
  const baseOctave = STANDARD_OCTAVES[note] || 3;
  const positionAdjustment = Math.floor(stringIndex / 2);
  return Math.max(1, baseOctave - positionAdjustment);
}

/**
 * Calculate the note with octave for a fretted position
 */
export function calculateNoteWithOctave(
  openNote: Note,
  stringIndex: number,
  totalStrings: number,
  fret: number
): NoteWithOctave {
  // Get base octave for the open string
  const baseOctave = getBaseOctave(openNote, stringIndex, totalStrings);
  
  // Calculate the resulting note from fretting
  const resultingNote = calculateFretNote(openNote, fret);
  
  // Calculate octave changes
  const octaveChange = Math.floor(fret / 12);
  
  // Handle octave crossing when going from B to C
  const openNoteIndex = CHROMATIC_NOTES.indexOf(openNote as typeof CHROMATIC_NOTES[number]);
  const resultingNoteIndex = CHROMATIC_NOTES.indexOf(resultingNote as typeof CHROMATIC_NOTES[number]);
  const crossedOctaveBoundary = openNoteIndex > resultingNoteIndex;
  
  const finalOctave = baseOctave + octaveChange + (crossedOctaveBoundary ? 1 : 0);
  
  return `${resultingNote}${finalOctave}` as NoteWithOctave;
}

/**
 * Memoized version of calculateNoteWithOctave for performance
 * Creates a cache key from the parameters and reuses calculations
 */
const calculationCache = new Map<string, NoteWithOctave>();

export function calculateNoteWithOctaveMemoized(
  openNote: Note,
  stringIndex: number,
  totalStrings: number,
  fret: number
): NoteWithOctave {
  const cacheKey = `${openNote}-${stringIndex}-${totalStrings}-${fret}`;
  
  const cached = calculationCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  const result = calculateNoteWithOctave(openNote, stringIndex, totalStrings, fret);
  calculationCache.set(cacheKey, result);
  
  // Prevent cache from growing too large
  if (calculationCache.size > 1000) {
    const firstKey = calculationCache.keys().next().value;
    if (firstKey) {
      calculationCache.delete(firstKey);
    }
  }
  
  return result;
}

/**
 * Clear the calculation cache (useful for testing or memory management)
 */
export function clearCalculationCache(): void {
  calculationCache.clear();
}