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
  { value: "major", labelKey: "scale.major", groupKey: "scaleGroup.common" },
  { value: "minor", labelKey: "scale.minor", groupKey: "scaleGroup.common" },
  { value: "pentatonic", labelKey: "scale.pentatonic", groupKey: "scaleGroup.common" },
  { value: "minor-pentatonic", labelKey: "scale.minor-pentatonic", groupKey: "scaleGroup.common" },
  { value: "blues", labelKey: "scale.blues", groupKey: "scaleGroup.common" },

  // Jazz Scales
  { value: "bebop", labelKey: "scale.bebop", groupKey: "scaleGroup.jazz" },
  { value: "bebop-dominant", labelKey: "scale.bebop-dominant", groupKey: "scaleGroup.jazz" },
  { value: "bebop-major", labelKey: "scale.bebop-major", groupKey: "scaleGroup.jazz" },
  { value: "bebop-minor", labelKey: "scale.bebop-minor", groupKey: "scaleGroup.jazz" },
  { value: "diminished", labelKey: "scale.diminished", groupKey: "scaleGroup.jazz" },
  { value: "whole-tone", labelKey: "scale.whole-tone", groupKey: "scaleGroup.jazz" },
  { value: "altered", labelKey: "scale.altered", groupKey: "scaleGroup.jazz" },

  // Modes
  { value: "dorian", labelKey: "scale.dorian", groupKey: "scaleGroup.modes" },
  { value: "phrygian", labelKey: "scale.phrygian", groupKey: "scaleGroup.modes" },
  { value: "lydian", labelKey: "scale.lydian", groupKey: "scaleGroup.modes" },
  { value: "mixolydian", labelKey: "scale.mixolydian", groupKey: "scaleGroup.modes" },
  { value: "aeolian", labelKey: "scale.aeolian", groupKey: "scaleGroup.modes" },
  { value: "locrian", labelKey: "scale.locrian", groupKey: "scaleGroup.modes" },

  // Modal Variants
  {
    value: "lydian-dominant",
    labelKey: "scale.lydian-dominant",
    groupKey: "scaleGroup.modalVariants",
  },
  { value: "super-locrian", labelKey: "scale.super-locrian", groupKey: "scaleGroup.modalVariants" },
  { value: "melodic-minor", labelKey: "scale.melodic-minor", groupKey: "scaleGroup.modalVariants" },
  { value: "harmonic-minor", labelKey: "scale.harmonic-minor", groupKey: "scaleGroup.modalVariants" },

  // Exotic Scales
  { value: "hungarian-minor", labelKey: "scale.hungarian-minor", groupKey: "scaleGroup.exotic" },
  { value: "ukrainian-dorian", labelKey: "scale.ukrainian-dorian", groupKey: "scaleGroup.exotic" },
  { value: "persian", labelKey: "scale.persian", groupKey: "scaleGroup.exotic" },
  { value: "byzantine", labelKey: "scale.byzantine", groupKey: "scaleGroup.exotic" },
  { value: "japanese", labelKey: "scale.japanese", groupKey: "scaleGroup.exotic" },
  { value: "hirajoshi", labelKey: "scale.hirajoshi", groupKey: "scaleGroup.exotic" },
  { value: "in-sen", labelKey: "scale.in-sen", groupKey: "scaleGroup.exotic" },
  { value: "iwato", labelKey: "scale.iwato", groupKey: "scaleGroup.exotic" },

  // Symmetric Scales
  { value: "chromatic", labelKey: "scale.chromatic", groupKey: "scaleGroup.symmetric" },
  {
    value: "diminished-whole-half",
    labelKey: "scale.diminished-whole-half",
    groupKey: "scaleGroup.symmetric",
  },
  {
    value: "diminished-half-whole",
    labelKey: "scale.diminished-half-whole",
    groupKey: "scaleGroup.symmetric",
  },

  // Pentatonic Variants
  { value: "egyptian", labelKey: "scale.egyptian", groupKey: "scaleGroup.pentatonicVariants" },
  { value: "chinese", labelKey: "scale.chinese", groupKey: "scaleGroup.pentatonicVariants" },
  {
    value: "japanese-pentatonic",
    labelKey: "scale.japanese-pentatonic",
    groupKey: "scaleGroup.pentatonicVariants",
  },
];

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
