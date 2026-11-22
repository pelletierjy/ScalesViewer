import { Note, NoteWithOctave } from "@/lib/utils/note";

/**
 * Chromatic index with C = 0, matching scientific pitch notation octaves.
 * Shared by the utilities that need an absolute semitone value for a note
 * like "F#3" (recorder offsets, trumpet chart lookups).
 */
export const CHROMATIC_INDEX: Record<Note, number> = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
};

/** Absolute semitone value for a note with octave (C0 = 0, C4 = 48, A4 = 57). */
export const getAbsolutePitch = (note: NoteWithOctave): number | null => {
  const match = note.match(/^([A-G][#b]?)(-?\d+)$/);
  if (!match) return null;
  const name = match[1] as Note;
  const octave = parseInt(match[2], 10);
  const pc = CHROMATIC_INDEX[name];
  if (pc === undefined) return null;
  return octave * 12 + pc;
};
