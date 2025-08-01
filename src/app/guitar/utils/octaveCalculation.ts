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
  // Special handling for common guitar configurations
  if (totalStrings === 6) {
    // Standard 6-string guitar (E-A-D-G-B-E from low to high)
    if (stringIndex === 0 && note === "E") return 4; // High E
    if (stringIndex === totalStrings - 1 && note === "E") return 2; // Low E
  }

  // Use standard octave mapping with adjustments
  const baseOctave = STANDARD_OCTAVES[note] || 3;
  
  // Lower strings (higher index) tend to be in lower octaves
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
    calculationCache.delete(firstKey);
  }
  
  return result;
}

/**
 * Clear the calculation cache (useful for testing or memory management)
 */
export function clearCalculationCache(): void {
  calculationCache.clear();
}