export interface MultiscalePreset {
  name: string;
  treble: number; // Scale length in inches for treble strings
  bass: number;   // Scale length in inches for bass strings
  strings: number; // Number of strings this preset is optimized for
}

export const MULTISCALE_PRESETS: MultiscalePreset[] = [
  // 6-string presets
  { name: "6-string Standard (25.5\" - 26.5\")", treble: 25.5, bass: 26.5, strings: 6 },
  { name: "6-string Extended (24.75\" - 25.5\")", treble: 24.75, bass: 25.5, strings: 6 },
  
  // 7-string presets
  { name: "7-string Common (25.5\" - 27\")", treble: 25.5, bass: 27, strings: 7 },
  { name: "7-string Strandberg (25.5\" - 26.25\")", treble: 25.5, bass: 26.25, strings: 7 },
  { name: "7-string Extended (26.5\" - 28\")", treble: 26.5, bass: 28, strings: 7 },
  
  // 8-string presets
  { name: "8-string Standard (26.5\" - 28\")", treble: 26.5, bass: 28, strings: 8 },
  { name: "8-string Extended (27\" - 28.5\")", treble: 27, bass: 28.5, strings: 8 },
  { name: "8-string Strandberg (26.5\" - 28\")", treble: 26.5, bass: 28, strings: 8 },
  { name: "8-string Ultra Extended (25.5\" - 33\")", treble: 25.5, bass: 33, strings: 8 },
  
  // 10-string presets
  { name: "10-string Extended Range (22.5\" - 33\")", treble: 22.5, bass: 33, strings: 10 },
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