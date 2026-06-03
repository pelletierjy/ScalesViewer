import { Note, NoteWithOctave } from "./note";
import { Scale } from "./scaleType";
import { getScaleNotes } from "./scaleUtils";

export type PatternStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface MelodicPattern {
  id: string;
  name: string;
  steps: PatternStep[];
}

export const PRESET_PATTERNS: MelodicPattern[] = [
  { id: "1235", name: "1-2-3-5", steps: [1, 2, 3, 5] },
  { id: "1531", name: "1-5-3-1", steps: [1, 5, 3, 1] },
  { id: "1357", name: "1-3-5-7", steps: [1, 3, 5, 7] },
  { id: "1231", name: "1-2-3-1", steps: [1, 2, 3, 1] },
  { id: "5321", name: "5-3-2-1", steps: [5, 3, 2, 1] },
];

/**
 * Get the note at a given scale degree (1-indexed).
 * Degree 1 = root, degree 7 = 7th (if scale has 7 notes).
 * Clamps to valid range [1, scaleLength].
 * Returns null if degree exceeds scale length after clamping.
 */
export const getScaleNoteByDegree = (scale: Scale, degree: number): Note | null => {
  const scaleNotes = getScaleNotes(scale);
  const scaleLength = scaleNotes.length;
  if (degree > scaleLength) {
    return null;
  }
  const clampedDegree = Math.max(1, Math.min(scaleLength, degree));
  return scaleNotes[clampedDegree - 1];
};

/**
 * Map a melodic pattern's steps to actual notes within a scale.
 * Filters out steps that exceed the scale length.
 */
export const getPatternNotes = (pattern: MelodicPattern, scale: Scale): (Note | null)[] => {
  return pattern.steps.map((step) => getScaleNoteByDegree(scale, step));
};

/**
 * Convert pattern notes to NoteWithOctave by appending a default octave.
 * Filters out null notes (degrees that exceed scale length).
 */
export const getPatternNotesWithOctave = (
  pattern: MelodicPattern,
  scale: Scale,
  octave: number = 4
): (NoteWithOctave | null)[] => {
  return getPatternNotes(pattern, scale).map((note) => 
    note !== null ? `${note}${octave}` as NoteWithOctave : null
  );
};
