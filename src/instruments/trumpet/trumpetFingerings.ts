/**
 * Trumpet fingering data — three piston valves.
 *
 * The chart is keyed by WRITTEN pitch (absolute semitones, C4 = 48, same
 * convention as `getAbsolutePitch` in `@/lib/utils/pitch`), because a B♭ trumpet
 * sounds a major second below what it reads. `getTrumpetFingering` transposes the
 * concert pitch the app works in before looking anything up, so the note labels,
 * colours and audio stay in concert pitch like every other instrument.
 *
 * Primary fingerings only — alternates (e.g. third valve alone for A, or the
 * 1-2-3 "alla buccina" fingering for G) are out of scope, matching the flute chart.
 *
 * Why the combinations look the way they do: valve 1 lowers the tube a whole step,
 * valve 2 a half step, valve 3 a minor third (1+2 = 3, 2+3 = 4, 1+3 = 5,
 * 1+2+3 = 6 semitones), and each note is taken from the harmonic partial that gives
 * the standard fingering — open on C4 (2nd partial), G4 (3rd), C5 (4th), and so on.
 *
 * Chart range: written F#3 (lowest standard note, concert E3) to D6 (concert C6).
 * Notes outside that span are simply "not on the chart", like an out-of-range flute
 * note: the diagram still draws, with no valves pressed.
 */

/** One of the three pistons, numbered 1 (left, closest to the mouthpiece) to 3. */
export type ValveNumber = 1 | 2 | 3;

/** Ordered valve combination for a note; an empty array means "open" (charted as 0). */
export type TrumpetValves = ValveNumber[];

export interface TrumpetFingering {
  /** Written pitch the chart is keyed on. */
  writtenPitch: number;
  /** Valves to depress; empty = open. */
  valves: TrumpetValves;
}

/** Lowest written pitch on the chart: F#3, sounding E3 on a B♭ trumpet. */
export const TRUMPET_LOW_WRITTEN = 42;

/** Highest written pitch on the chart: D6, sounding C6 on a B♭ trumpet. */
export const TRUMPET_HIGH_WRITTEN = 74;

/**
 * Fingering chart keyed by written pitch (absolute semitones).
 * Enharmonics collapse onto the same key because the pitch is absolute
 * (Db4 and C#4 are both 49), so no normalization is needed at lookup time.
 */
export const TRUMPET_FINGERING_BY_WRITTEN_PITCH: Record<number, TrumpetValves> = {
  // Low register, below written middle C: the 2nd partial of each valve combination.
  42: [1, 2, 3], // F#3 (lowest standard note)
  43: [1, 3], // G3
  44: [2, 3], // Ab3
  45: [1, 2], // A3
  46: [1], // Bb3
  47: [2], // B3
  // From written middle C up, the pattern repeats every octave:
  // C = open, C# = 1-2-3, D = 1-3, Eb = 2-3, E = 1-2, F = 1, F# = 2,
  // G = open, Ab = 2-3, A = 1-2, Bb = 1, B = 2.
  48: [], // C4
  49: [1, 2, 3], // C#4
  50: [1, 3], // D4
  51: [2, 3], // Eb4
  52: [1, 2], // E4
  53: [1], // F4
  54: [2], // F#4
  55: [], // G4
  56: [2, 3], // Ab4
  57: [1, 2], // A4
  58: [1], // Bb4
  59: [2], // B4
  60: [], // C5
  61: [1, 2, 3], // C#5
  62: [1, 3], // D5
  63: [2, 3], // Eb5
  64: [1, 2], // E5
  65: [1], // F5
  66: [2], // F#5
  67: [], // G5
  68: [2, 3], // Ab5
  69: [1, 2], // A5
  70: [1], // Bb5
  71: [2], // B5
  72: [], // C6
  73: [1, 2, 3], // C#6
  74: [1, 3], // D6
};

/**
 * A trumpet model. `transposition` is the number of semitones added to a concert
 * pitch to reach the written pitch the chart is keyed on: a B♭ trumpet reads a
 * major second higher than it sounds, a C trumpet reads what it sounds.
 */
export interface TrumpetType {
  id: string;
  /** i18n key (under the `trumpet` namespace) for the display name. */
  nameKey: string;
  transposition: number;
}

export const TRUMPET_TYPES: TrumpetType[] = [
  { id: "bb", nameKey: "trumpet.inBb", transposition: 2 },
  { id: "c", nameKey: "trumpet.inC", transposition: 0 },
];

export const DEFAULT_TRUMPET_TYPE_ID = "bb";

export const getTrumpetType = (id: string): TrumpetType =>
  TRUMPET_TYPES.find((t) => t.id === id) ??
  TRUMPET_TYPES.find((t) => t.id === DEFAULT_TRUMPET_TYPE_ID)!;
