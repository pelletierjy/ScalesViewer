import { Note } from "./note";
import { Scale } from "./scaleType";

export const ROOTS: Note[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const SCALE_TYPES = [
  // Common Scales
  { value: "major", label: "Major (Ionian)", group: "Common" },
  { value: "minor", label: "Minor (Natural)", group: "Common" },
  { value: "pentatonic", label: "Major Pentatonic", group: "Common" },
  { value: "minor-pentatonic", label: "Minor Pentatonic", group: "Common" },
  { value: "blues", label: "Blues", group: "Common" },

  // Jazz Scales
  { value: "bebop", label: "Bebop", group: "Jazz" },
  { value: "bebop-dominant", label: "Bebop Dominant", group: "Jazz" },
  { value: "bebop-major", label: "Bebop Major", group: "Jazz" },
  { value: "bebop-minor", label: "Bebop Minor", group: "Jazz" },
  { value: "diminished", label: "Diminished", group: "Jazz" },
  { value: "whole-tone", label: "Whole Tone", group: "Jazz" },
  { value: "altered", label: "Altered", group: "Jazz" },

  // Modes
  { value: "dorian", label: "Dorian", group: "Modes" },
  { value: "phrygian", label: "Phrygian", group: "Modes" },
  { value: "lydian", label: "Lydian", group: "Modes" },
  { value: "mixolydian", label: "Mixolydian", group: "Modes" },
  { value: "aeolian", label: "Aeolian", group: "Modes" },
  { value: "locrian", label: "Locrian", group: "Modes" },

  // Modal Variants
  {
    value: "lydian-dominant",
    label: "Lydian Dominant",
    group: "Modal Variants",
  },
  { value: "super-locrian", label: "Super Locrian", group: "Modal Variants" },
  { value: "melodic-minor", label: "Melodic Minor", group: "Modal Variants" },
  { value: "harmonic-minor", label: "Harmonic Minor", group: "Modal Variants" },

  // Exotic Scales
  { value: "hungarian-minor", label: "Hungarian Minor", group: "Exotic" },
  { value: "ukrainian-dorian", label: "Ukrainian Dorian", group: "Exotic" },
  { value: "persian", label: "Persian", group: "Exotic" },
  { value: "byzantine", label: "Byzantine", group: "Exotic" },
  { value: "japanese", label: "Japanese", group: "Exotic" },
  { value: "hirajoshi", label: "Hirajoshi", group: "Exotic" },
  { value: "in-sen", label: "In-Sen", group: "Exotic" },
  { value: "iwato", label: "Iwato", group: "Exotic" },

  // Symmetric Scales
  { value: "chromatic", label: "Chromatic", group: "Symmetric" },
  {
    value: "diminished-whole-half",
    label: "Diminished (W-H)",
    group: "Symmetric",
  },
  {
    value: "diminished-half-whole",
    label: "Diminished (H-W)",
    group: "Symmetric",
  },

  // Pentatonic Variants
  { value: "egyptian", label: "Egyptian", group: "Pentatonic Variants" },
  { value: "chinese", label: "Chinese", group: "Pentatonic Variants" },
  {
    value: "japanese-pentatonic",
    label: "Japanese Pentatonic",
    group: "Pentatonic Variants",
  },
] as const;

// Scale patterns (intervals from root)
export const SCALE_PATTERNS = {
  // Common Scales
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic: [0, 2, 4, 7, 9],
  "minor-pentatonic": [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],

  // Jazz Scales
  bebop: [0, 2, 4, 5, 7, 9, 10, 11],
  "bebop-dominant": [0, 2, 4, 5, 7, 9, 10, 11],
  "bebop-major": [0, 2, 4, 5, 7, 8, 9, 11],
  "bebop-minor": [0, 2, 3, 5, 7, 8, 9, 10],
  diminished: [0, 2, 3, 5, 6, 8, 9, 11],
  "whole-tone": [0, 2, 4, 6, 8, 10],
  altered: [0, 1, 3, 4, 6, 8, 10],

  // Modes
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  aeolian: [0, 2, 3, 5, 7, 8, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],

  // Modal Variants
  "lydian-dominant": [0, 2, 4, 6, 7, 9, 10],
  "super-locrian": [0, 1, 3, 4, 6, 8, 10],
  "melodic-minor": [0, 2, 3, 5, 7, 9, 11],
  "harmonic-minor": [0, 2, 3, 5, 7, 8, 11],

  // Exotic Scales
  "hungarian-minor": [0, 2, 3, 6, 7, 8, 11],
  "ukrainian-dorian": [0, 2, 3, 6, 7, 9, 10],
  persian: [0, 1, 4, 5, 6, 8, 11],
  byzantine: [0, 1, 4, 5, 7, 8, 11],
  japanese: [0, 1, 5, 7, 8],
  hirajoshi: [0, 2, 3, 7, 8],
  "in-sen": [0, 1, 5, 7, 10],
  iwato: [0, 1, 5, 6, 10],

  // Symmetric Scales
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  "diminished-whole-half": [0, 2, 3, 5, 6, 8, 9, 11],
  "diminished-half-whole": [0, 1, 3, 4, 6, 7, 9, 10],

  // Pentatonic Variants
  egyptian: [0, 2, 5, 7, 10],
  chinese: [0, 4, 6, 7, 11],
  "japanese-pentatonic": [0, 2, 5, 7, 8],
};

export const COMMON_SCALES: Scale[] = [
  { root: "C", type: "major" },
  { root: "A", type: "minor" },
  { root: "G", type: "major" },
  { root: "E", type: "minor" },
  { root: "D", type: "major" },
  { root: "A", type: "pentatonic" },
  { root: "E", type: "blues" },
  { root: "C", type: "pentatonic" },
];

// Default scale for initial state
export const DEFAULT_SCALE: Scale = {
  root: "C",
  type: "major",
};
