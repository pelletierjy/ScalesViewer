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

/**
 * The instrument a pathname routes to, or null when it doesn't name one.
 *
 * "/guitar/" -> "guitar", "/guitar" -> "guitar", "/" -> null,
 * "/index.html" -> null, "/guitar/anything" -> "guitar".
 *
 * Used to decide whether the URL and the selected instrument agree — an
 * exact segment match, unlike a substring test, so an unknown first segment
 * (a typo'd or stale path) correctly counts as "no instrument route".
 */
export function getRouteInstrument(pathname: string): Instrument | null {
  const segment = pathname.split("/")[1] ?? "";
  return isInstrument(segment) ? segment : null;
}