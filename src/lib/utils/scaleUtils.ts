
import { Note } from "./note";
import { SCALE_PATTERNS } from "./scaleConstants";
import { ScaleMode, Scale } from "./scaleType";

const NOTES: Note[] = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

const FLAT_TO_SHARP: Partial<Record<Note, Note>> = {
  Bb: "A#",
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
};

// Map sharp notes to their flat equivalents for display
export const SHARP_TO_FLAT: Partial<Record<Note, Note>> = {
  "A#": "Bb",
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
};

export const sharpToFlat = (note: Note): Note => {
  return SHARP_TO_FLAT[note] || note;
};

const normalizeNote = (note: Note): Note => {
  return FLAT_TO_SHARP[note] || note;
};

const MODE_ROTATIONS: Record<ScaleMode, number> = {
  ionian: 0,
  dorian: 1,
  phrygian: 2,
  lydian: 3,
  mixolydian: 4,
  aeolian: 5,
  locrian: 6,
};

export const SCALE_DEGREES = [
  "1",
  "♭2",
  "2",
  "♭3",
  "3",
  "4",
  "♭5",
  "5",
  "♭6",
  "6",
  "♭7",
  "7",
];

export const getNoteIndex = (note: Note): number => {
  const normalizedNote = normalizeNote(note);
  return NOTES.indexOf(normalizedNote);
};

export const getNoteAtInterval = (root: Note, interval: number): Note => {
  const rootIndex = getNoteIndex(root);
  const noteIndex = (rootIndex + interval) % 12;
  const resultNote = NOTES[noteIndex];
  
  // Preserve flat notation if the root note is flat
  const isRootFlat = root.includes('b');
  if (isRootFlat && SHARP_TO_FLAT[resultNote as keyof typeof SHARP_TO_FLAT]) {
    return SHARP_TO_FLAT[resultNote as keyof typeof SHARP_TO_FLAT];
  }
  
  return resultNote;
};

export const getScaleNotes = (scale: Scale): Note[] => {
  const { root, type, mode } = scale;
  let basePatternForScale = [...SCALE_PATTERNS[type]];
  
  // Apply mode rotation if specified and it's a major scale
  if (mode && type === "major") {
    const rotation = MODE_ROTATIONS[mode];
    
    // For relative modes: find the root note of the parent major scale
    // D Dorian = notes of C Major starting from D
    const chromaticNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const majorScalePattern = [0, 2, 4, 5, 7, 9, 11];
    
    // Find what major scale contains this mode (normalize root for lookup)
    const normalizedRoot = normalizeNote(root);
    const rootIndex = chromaticNotes.indexOf(normalizedRoot);
    const parentMajorRootIndex = (rootIndex - majorScalePattern[rotation] + 12) % 12;
    const parentMajorRoot = chromaticNotes[parentMajorRootIndex];
    
    // Generate the major scale notes and return them starting from the modal root
    const parentMajorNotes = majorScalePattern.map(interval => 
      chromaticNotes[(parentMajorRootIndex + interval) % 12]
    );
    
    // Find the starting position and rotate the array
    const normalizedRootInScale = parentMajorNotes.indexOf(normalizedRoot);
    const rotatedNotes = [...parentMajorNotes.slice(normalizedRootInScale), ...parentMajorNotes.slice(0, normalizedRootInScale)];
    
    // Preserve flat notation if root is flat
    if (root.includes('b')) {
      return rotatedNotes.map(note => SHARP_TO_FLAT[note as keyof typeof SHARP_TO_FLAT] || note);
    }
    
    return rotatedNotes;
  }

  // Generate the notes based on the pattern (for non-modal scales)
  return basePatternForScale.map((interval) => getNoteAtInterval(root, interval));
};

export const isNoteInScale = (note: Note, scale: Scale): boolean => {
  const scaleNotes = getScaleNotes(scale);
  return scaleNotes.includes(note);
};

export const getNextNote = (note: Note): Note => {
  const currentIndex = getNoteIndex(note);
  return NOTES[(currentIndex + 1) % 12];
};

export const getPreviousNote = (note: Note): Note => {
  const currentIndex = getNoteIndex(note);
  return NOTES[(currentIndex - 1 + 12) % 12];
};

export const calculateFretNote = (openNote: Note, fret: number): Note => {
  const openNoteIndex = getNoteIndex(openNote);
  const noteIndex = (openNoteIndex + fret) % 12;
  return NOTES[noteIndex];
};

export const getScaleDegree = (note: Note, scale: Scale): string => {
  // First check if the note is in the scale
  if (!isNoteInScale(note, scale)) {
    return '';
  }
  
  const rootIndex = getNoteIndex(scale.root);
  const noteIndex = getNoteIndex(note);
  const interval = (noteIndex - rootIndex + 12) % 12;
  return SCALE_DEGREES[interval];
};

export const getInterval = (from: Note, to: Note): number => {
  const fromIndex = getNoteIndex(from);
  const toIndex = getNoteIndex(to);
  return (toIndex - fromIndex + 12) % 12;
};

export const transposeNote = (note: Note, interval: number): Note => {
  const noteIndex = getNoteIndex(note);
  const newIndex = (noteIndex + interval + 12) % 12;
  return NOTES[newIndex];
};
