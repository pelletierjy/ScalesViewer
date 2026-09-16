import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { getScaleNotes } from "@/lib/utils/scaleUtils";
import {
  RECORDER_FINGERING_BY_OFFSET,
  RECORDER_HOLE_DEFINITIONS,
  RecorderFingering,
  RecorderHoleRenderState,
  RecorderHoleState,
  RecorderHoleValue,
  RecorderType,
} from "@/app/recorder/recorderFingerings";

// Chromatic index with C = 0, matching scientific pitch notation octaves.
const CHROMATIC_INDEX: Record<Note, number> = {
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

/** Absolute semitone value for a recorder's lowest (all-holes-closed) note. */
export const getRecorderBasePitch = (recorder: RecorderType): number =>
  recorder.baseOctave * 12 + CHROMATIC_INDEX[recorder.baseNote];

/**
 * Octave for the scale root so the generated run starts at (or above) the recorder's
 * lowest note. Keeps the displayed fingerings inside the playable range.
 */
export const getRecorderStartOctave = (
  scale: Scale,
  recorder: RecorderType
): number => {
  const basePitch = getRecorderBasePitch(recorder);
  const rootPc = CHROMATIC_INDEX[scale.root] ?? 0;
  // Smallest octave O such that O*12 + rootPc >= basePitch.
  return Math.ceil((basePitch - rootPc) / 12);
};

/**
 * Generate `count` consecutive ascending scale notes for a recorder, starting from the
 * scale root at the lowest octave that reaches the instrument's range. Unlike the flute
 * generator, octaves follow scientific pitch (they roll over when the pitch class crosses
 * C), so the run ascends monotonically and every note maps to an in-range fingering.
 */
export const getRecorderScaleNotes = (
  scale: Scale,
  count: number,
  recorder: RecorderType
): NoteWithOctave[] => {
  if (count <= 0) return [];
  if (!scale.root || !scale.type) {
    throw new Error("Invalid scale: missing root or type");
  }

  const scaleNotes = getScaleNotes(scale);
  if (scaleNotes.length === 0) return [];

  const result: NoteWithOctave[] = [];
  let octave = getRecorderStartOctave(scale, recorder);
  let prevPc = CHROMATIC_INDEX[scaleNotes[0]] ?? 0;

  for (let i = 0; i < count; i++) {
    const note = scaleNotes[i % scaleNotes.length];
    const pc = CHROMATIC_INDEX[note] ?? 0;
    // Roll the octave over whenever the pitch class does not keep rising (crossed C).
    if (i > 0 && pc <= prevPc) {
      octave += 1;
    }
    result.push(`${note}${octave}` as NoteWithOctave);
    prevPc = pc;
  }

  return result;
};

const interpretThumb = (value: RecorderHoleValue): RecorderHoleState => {
  if (value === "t") return "half";
  if (value === "0") return "open";
  return "closed";
};

const interpretSingle = (value: RecorderHoleValue): RecorderHoleState => {
  if (value === "h") return "half";
  if (value === "0") return "open";
  return "closed"; // "1" and the "optional" cases render as covered
};

/**
 * Look up the baroque fingering for a sounding note on a given recorder.
 * Returns null when the note lies outside the instrument's charted range.
 */
export function getRecorderFingering(
  note: NoteWithOctave,
  recorder: RecorderType
): RecorderFingering | null {
  const pitch = getAbsolutePitch(note);
  if (pitch === null) return null;

  const offset = pitch - getRecorderBasePitch(recorder);
  const vector = RECORDER_FINGERING_BY_OFFSET[offset];
  if (!vector) return null;

  const holes: RecorderHoleRenderState[] = RECORDER_HOLE_DEFINITIONS.map(
    (def, i) => {
      const value = vector[i];
      if (def.thumb) {
        return {
          holeId: def.holeId,
          label: def.label,
          thumb: true,
          isDouble: false,
          state: interpretThumb(value),
        };
      }
      if (def.isDouble) {
        // "2" = both closed, "1" = one of the pair closed, "0" = both open.
        const left: RecorderHoleState =
          value === "0" ? "open" : "closed";
        const right: RecorderHoleState =
          value === "2" ? "closed" : "open";
        const state: RecorderHoleState =
          value === "2" ? "closed" : value === "0" ? "open" : "half";
        return {
          holeId: def.holeId,
          label: def.label,
          thumb: false,
          isDouble: true,
          state,
          left,
          right,
        };
      }
      return {
        holeId: def.holeId,
        label: def.label,
        thumb: false,
        isDouble: false,
        state: interpretSingle(value),
      };
    }
  );

  return { offset, holes };
}
