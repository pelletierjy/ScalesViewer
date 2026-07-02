import { NoteWithOctave } from "@/lib/utils/note";

export interface FluteKeyDefinition {
  keyId: string;
  label: string;
  position: number;
  hand: "left" | "right" | "trill" | "pinky" | "foot";
}

export interface FluteKeyState {
  keyId: string;
  closed: boolean;
  label: string;
}

export interface FluteFingering {
  note: NoteWithOctave;
  keys: FluteKeyState[];
}

export const FLUTE_KEY_DEFINITIONS: FluteKeyDefinition[] = [
  { keyId: "thumb", label: "Thumb", position: 0, hand: "left" },
  { keyId: "l1", label: "L1", position: 1, hand: "left" },
  { keyId: "l2", label: "L2", position: 2, hand: "left" },
  { keyId: "l3", label: "L3", position: 3, hand: "left" },
  { keyId: "r1", label: "R1", position: 4, hand: "right" },
  { keyId: "r2", label: "R2", position: 5, hand: "right" },
  { keyId: "r3", label: "R3", position: 6, hand: "right" },
  { keyId: "eb", label: "E♭", position: 7, hand: "pinky" },
  { keyId: "gsharp", label: "G♯", position: 8, hand: "pinky" },
  { keyId: "c", label: "C", position: 9, hand: "pinky" },
  { keyId: "csharp", label: "C♯", position: 10, hand: "pinky" },
  { keyId: "b", label: "B", position: 11, hand: "pinky" },
  { keyId: "lowc", label: "Low C", position: 12, hand: "foot" },
  { keyId: "lowcsharp", label: "Low C♯", position: 13, hand: "foot" },
  { keyId: "lowd", label: "Low D", position: 14, hand: "foot" },
];

// Helper to make the map more readable
const c = true;
const o = false;

export const FLUTE_FINGERING_MAP: Partial<Record<NoteWithOctave, boolean[]>> = {
  // First octave (C4–B4)
  C4:  [c, c, c, c, c, c, c, o, o, o, o, o, o, o, o],
  "C#4": [c, c, c, c, c, c, c, o, o, o, o, o, o, o, c],
  D4:  [c, c, c, c, c, c, c, o, o, o, o, o, o, o, c],
  "D#4": [c, c, c, c, c, c, o, o, o, o, o, o, o, o, c],
  E4:  [c, c, c, c, c, c, o, o, o, o, o, o, o, o, o],
  F4:  [c, c, c, c, c, o, o, o, o, o, o, o, o, o, o],
  "F#4": [c, c, c, c, o, o, o, o, o, o, o, o, o, o, o],
  G4:  [c, c, c, c, o, o, o, o, o, o, o, o, o, o, o],
  "G#4": [c, c, c, o, o, o, o, o, c, o, o, o, o, o, o],
  A4:  [c, c, c, o, o, o, o, o, o, o, o, o, o, o, o],
  "A#4": [c, c, o, o, o, o, o, o, o, o, o, c, o, o, o],
  B4:  [c, c, o, o, o, o, o, o, o, o, o, o, o, o, o],
  // Second octave (C5–B5)
  C5:  [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
  "C#5": [o, o, o, o, o, o, o, o, o, o, o, o, o, o, c],
  D5:  [c, c, c, c, c, c, c, o, o, o, o, o, o, o, c],
  "D#5": [c, c, c, c, c, c, o, o, o, o, o, o, o, o, c],
  E5:  [c, c, c, c, c, c, o, o, o, o, o, o, o, o, o],
  F5:  [c, c, c, c, c, o, o, o, o, o, o, o, o, o, o],
  "F#5": [c, c, c, c, o, o, o, o, o, o, o, o, o, o, o],
  G5:  [c, c, c, c, o, o, o, o, o, o, o, o, o, o, o],
  "G#5": [c, c, c, o, o, o, o, o, c, o, o, o, o, o, o],
  A5:  [c, c, c, o, o, o, o, o, o, o, o, o, o, o, o],
  "A#5": [c, c, o, o, o, o, o, o, o, o, o, c, o, o, o],
  B5:  [c, c, o, o, o, o, o, o, o, o, o, o, o, o, o],
  // Third octave (C6–B6)
  C6:  [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
  "C#6": [o, o, o, o, o, o, o, o, o, o, o, o, o, o, c],
  D6:  [c, c, c, c, c, c, c, o, o, o, o, o, o, o, c],
  "D#6": [c, c, c, c, c, c, o, o, o, o, o, o, o, o, c],
  E6:  [c, c, c, c, c, c, o, o, o, o, o, o, o, o, o],
  F6:  [c, c, c, c, c, o, o, o, o, o, o, o, o, o, o],
  "F#6": [c, c, c, c, o, o, o, o, o, o, o, o, o, o, o],
  G6:  [c, c, c, c, o, o, o, o, o, o, o, o, o, o, o],
  "G#6": [c, c, c, o, o, o, o, o, c, o, o, o, o, o, o],
  A6:  [c, c, c, o, o, o, o, o, o, o, o, o, o, o, o],
  "A#6": [c, c, o, o, o, o, o, o, o, o, o, c, o, o, o],
  B6:  [c, c, o, o, o, o, o, o, o, o, o, o, o, o, o],
  // Highest C
  C7:  [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
};
