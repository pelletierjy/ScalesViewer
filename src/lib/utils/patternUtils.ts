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
 * Degree 1 = root, degree 7 = 7th.
 * Clamps to valid range [1, 7].
 */
export const getScaleNoteByDegree = (scale: Scale, degree: number): Note => {
  const scaleNotes = getScaleNotes(scale);
  const clampedDegree = Math.max(1, Math.min(7, degree));
  return scaleNotes[clampedDegree - 1];
};

/**
 * Map a melodic pattern's steps to actual notes within a scale.
 */
export const getPatternNotes = (pattern: MelodicPattern, scale: Scale): Note[] => {
  return pattern.steps.map((step) => getScaleNoteByDegree(scale, step));
};

/**
 * Convert pattern notes to NoteWithOctave by appending a default octave.
 */
export const getPatternNotesWithOctave = (
  pattern: MelodicPattern,
  scale: Scale,
  octave: number = 4
): NoteWithOctave[] => {
  return getPatternNotes(pattern, scale).map((note) => `${note}${octave}` as NoteWithOctave);
};
