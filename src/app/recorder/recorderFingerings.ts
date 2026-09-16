import { Note } from "@/lib/utils/note";

/**
 * Recorder fingering data.
 *
 * Baroque (English) fingering. All sizes of recorder — the "in C" instruments
 * (soprano/descant, tenor, great bass, sub-contrabass) and the "in F" instruments
 * (sopranino, alto/treble, bass, contrabass) — share the SAME fingerings; only the
 * sounding pitch differs by transposition. Because of this we store a single chart
 * indexed by the semitone offset from the recorder's lowest note (all holes closed).
 *
 * Source: the `recorder-fingering` LaTeX package by Alan Munn, whose core fingerings
 * are taken from Kenneth Wollitz, "The Recorder Book" (Alfred A. Knopf, 1981).
 *
 * Hole vector layout: [thumb, 1, 2, 3, 4, 5, 6, 7]. Holes 6 and 7 are double holes.
 *   "1"  closed (thumb / holes 1-5), or a single hole of a double pair closed (6/7)
 *   "0"  open
 *   "t"  half-covered thumb (upper register "pinch")
 *   "h"  half-covered hole (holes 1-5)
 *   "2"  double hole fully closed (holes 6/7 only)
 */

export type RecorderHoleValue = "0" | "1" | "2" | "t" | "h";

/** Normalized state used by the diagram renderer. */
export type RecorderHoleState = "open" | "closed" | "half";

export interface RecorderHoleDefinition {
  holeId: string;
  label: string;
  /** true for the back thumb hole (drawn offset behind the body) */
  thumb?: boolean;
  /** true for the two bottom double holes (6 and 7) */
  isDouble?: boolean;
}

export interface RecorderHoleRenderState {
  holeId: string;
  label: string;
  thumb: boolean;
  isDouble: boolean;
  /** For single holes / thumb: open | closed | half. */
  state: RecorderHoleState;
  /**
   * For double holes only: state of the left and right sub-holes.
   * closed = both, half = one of the pair, open = neither.
   */
  left?: RecorderHoleState;
  right?: RecorderHoleState;
}

export interface RecorderFingering {
  /** Semitone offset above the recorder's lowest note. */
  offset: number;
  holes: RecorderHoleRenderState[];
}

// Front-to-back hole layout (top of the instrument first).
export const RECORDER_HOLE_DEFINITIONS: RecorderHoleDefinition[] = [
  { holeId: "thumb", label: "T", thumb: true },
  { holeId: "h1", label: "1" },
  { holeId: "h2", label: "2" },
  { holeId: "h3", label: "3" },
  { holeId: "h4", label: "4" },
  { holeId: "h5", label: "5" },
  { holeId: "h6", label: "6", isDouble: true },
  { holeId: "h7", label: "7", isDouble: true },
];

/**
 * Fingering chart keyed by semitone offset from the lowest note.
 * Covers two octaves plus the extended top notes (C up to e-flat'' relative to the
 * instrument's lowest note). Offsets outside this map have no standard fingering
 * (the diagram simply omits the hole markings, like an out-of-range flute note).
 */
export const RECORDER_FINGERING_BY_OFFSET: Record<number, RecorderHoleValue[]> = {
  0:  ["1", "1", "1", "1", "1", "1", "2", "2"], // C
  1:  ["1", "1", "1", "1", "1", "1", "2", "1"], // C#/Db
  2:  ["1", "1", "1", "1", "1", "1", "2", "0"], // D
  3:  ["1", "1", "1", "1", "1", "1", "1", "0"], // D#/Eb
  4:  ["1", "1", "1", "1", "1", "1", "0", "0"], // E
  5:  ["1", "1", "1", "1", "1", "0", "2", "2"], // F
  6:  ["1", "1", "1", "1", "0", "1", "2", "0"], // F#/Gb
  7:  ["1", "1", "1", "1", "0", "0", "0", "0"], // G
  8:  ["1", "1", "1", "0", "1", "1", "1", "0"], // G#/Ab
  9:  ["1", "1", "1", "0", "0", "0", "0", "0"], // A
  10: ["1", "1", "0", "1", "1", "0", "0", "0"], // A#/Bb
  11: ["1", "1", "0", "0", "0", "0", "0", "0"], // B
  12: ["1", "0", "1", "0", "0", "0", "0", "0"], // c
  13: ["0", "1", "1", "0", "0", "0", "0", "0"], // c#/db
  14: ["0", "0", "1", "0", "0", "0", "0", "0"], // d
  15: ["0", "0", "1", "1", "1", "1", "2", "0"], // d#/eb
  16: ["t", "1", "1", "1", "1", "1", "0", "0"], // e
  17: ["t", "1", "1", "1", "1", "0", "2", "0"], // f
  18: ["t", "1", "1", "1", "0", "1", "0", "0"], // f#/gb
  19: ["t", "1", "1", "1", "0", "0", "0", "0"], // g
  20: ["t", "1", "1", "0", "1", "0", "0", "0"], // g#/ab
  21: ["t", "1", "1", "0", "0", "0", "0", "0"], // a
  22: ["t", "1", "1", "0", "1", "1", "2", "0"], // a#/bb
  23: ["t", "1", "1", "0", "1", "1", "0", "0"], // b
  24: ["t", "1", "0", "0", "1", "1", "0", "0"], // c'
  26: ["t", "1", "0", "1", "1", "0", "2", "2"], // d'
  27: ["t", "0", "1", "1", "0", "1", "2", "0"], // d#'/eb'
};

/**
 * A recorder size. Recorders come "in C" (lowest note C) or "in F" (lowest note F).
 * `baseNote` / `baseOctave` describe the sounding pitch of the lowest note (all holes
 * closed), which anchors the transposition used when looking up fingerings.
 */
export interface RecorderType {
  id: string;
  name: string;
  /** Key the instrument is built in: "C" (en Do) or "F" (en Fa). */
  key: "C" | "F";
  baseNote: Note;
  baseOctave: number;
}

export const RECORDER_TYPES: RecorderType[] = [
  { id: "sopranino", name: "Sopranino", key: "F", baseNote: "F", baseOctave: 5 },
  { id: "soprano", name: "Soprano (Descant)", key: "C", baseNote: "C", baseOctave: 5 },
  { id: "alto", name: "Alto (Treble)", key: "F", baseNote: "F", baseOctave: 4 },
  { id: "tenor", name: "Tenor", key: "C", baseNote: "C", baseOctave: 4 },
  { id: "bass", name: "Bass", key: "F", baseNote: "F", baseOctave: 3 },
  { id: "greatbass", name: "Great Bass", key: "C", baseNote: "C", baseOctave: 3 },
  { id: "contrabass", name: "Contrabass", key: "F", baseNote: "F", baseOctave: 2 },
  { id: "subcontrabass", name: "Sub-contrabass", key: "C", baseNote: "C", baseOctave: 2 },
];

export const DEFAULT_RECORDER_TYPE_ID = "soprano";

export const getRecorderType = (id: string): RecorderType =>
  RECORDER_TYPES.find((t) => t.id === id) ??
  RECORDER_TYPES.find((t) => t.id === DEFAULT_RECORDER_TYPE_ID)!;
