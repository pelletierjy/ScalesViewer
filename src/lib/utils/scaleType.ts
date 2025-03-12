import { Note } from "./note";

export type ScaleType =
  // Common Scales
  | "major"
  | "minor"
  | "pentatonic"
  | "blues"
  // Jazz Scales
  | "bebop"
  | "bebop-dominant"
  | "bebop-major"
  | "bebop-minor"
  | "diminished"
  | "whole-tone"
  | "altered"
  // Modes
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "aeolian"
  | "locrian"
  // Modal Variants
  | "lydian-dominant"
  | "super-locrian"
  | "melodic-minor"
  | "harmonic-minor"
  // Exotic Scales
  | "hungarian-minor"
  | "ukrainian-dorian"
  | "persian"
  | "byzantine"
  | "japanese"
  | "hirajoshi"
  | "in-sen"
  | "iwato"
  // Symmetric Scales
  | "chromatic"
  | "whole-tone"
  | "diminished-whole-half"
  | "diminished-half-whole"
  // Pentatonic Variants
  | "minor-pentatonic"
  | "egyptian"
  | "chinese"
  | "japanese-pentatonic";

  
export type ScaleMode =
| "ionian"
| "dorian"
| "phrygian"
| "lydian"
| "mixolydian"
| "aeolian"
| "locrian";

export interface Scale {
root: Note;
type: ScaleType;
mode?: ScaleMode;
}

