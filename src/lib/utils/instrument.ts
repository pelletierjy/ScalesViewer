export type Instrument =
  | "guitar"
  | "piano"
  | "kalimba"
  | "harmonica"
  | "flute"
  | "recorder";

export const INSTRUMENTS: Instrument[] = [
  "guitar",
  "piano",
  "kalimba",
  "harmonica",
  "flute",
  "recorder",
];

export const defaultInstrument: Instrument = "flute";

export function isInstrument(value: string): value is Instrument {
  return INSTRUMENTS.includes(value as Instrument);
}