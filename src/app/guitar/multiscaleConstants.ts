export interface MultiscalePreset {
  name: string;
  treble: number; // Scale length in inches for treble strings
  bass: number;   // Scale length in inches for bass strings
  strings: number; // Number of strings this preset is optimized for
}

export const MULTISCALE_PRESETS: MultiscalePreset[] = [
  { name: "6-string Standard", treble: 25.5, bass: 28.5, strings: 6 },
  { name: "7-string Common", treble: 25.5, bass: 29, strings: 7 },
  { name: "8-string Standard", treble: 25.5, bass: 31, strings: 8 },
  { name: "9-string Standard", treble: 25.5, bass: 31, strings: 9 },
  { name: "10-string Extended Range", treble: 22.5, bass: 33, strings: 10 },
];

export const PERPENDICULAR_FRET_OPTIONS = [
  { value: 0, label: "Nut (0th fret)" },
  { value: 7, label: "7th fret" },
  { value: 9, label: "9th fret" },
  { value: 12, label: "12th fret" },
];

// Helper function to get scale length for a specific string
export const getStringScaleLength = (
  stringIndex: number,
  totalStrings: number,
  trebleLength: number,
  bassLength: number
): number => {
  // Linear interpolation from treble to bass
  const ratio = stringIndex / (totalStrings - 1);
  return trebleLength + (bassLength - trebleLength) * ratio;
};