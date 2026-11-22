import { NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { getScaleNotes } from "@/lib/utils/scaleUtils";
import { CHROMATIC_INDEX, getAbsolutePitch } from "@/lib/utils/pitch";
import {
  TRUMPET_FINGERING_BY_WRITTEN_PITCH,
  TRUMPET_HIGH_WRITTEN,
  TRUMPET_LOW_WRITTEN,
  TrumpetFingering,
  TrumpetType,
} from "@/instruments/trumpet/trumpetFingerings";

/**
 * Concert-pitch range of a given trumpet: the charted written span shifted down
 * by the instrument's transposition (a whole step on a B♭ trumpet).
 */
export const getTrumpetRange = (
  trumpet: TrumpetType
): { low: number; high: number } => ({
  low: TRUMPET_LOW_WRITTEN - trumpet.transposition,
  high: TRUMPET_HIGH_WRITTEN - trumpet.transposition,
});

/**
 * Octave for the scale root so the generated run starts at (or above) the
 * trumpet's lowest concert note. Keeps the displayed fingerings on the chart
 * for as long as possible, the same way the recorder run picks its start.
 */
export const getTrumpetStartOctave = (
  scale: Scale,
  trumpet: TrumpetType
): number => {
  const rootPc = CHROMATIC_INDEX[scale.root] ?? 0;
  const { low } = getTrumpetRange(trumpet);
  // Smallest octave O such that O*12 + rootPc >= low.
  return Math.ceil((low - rootPc) / 12);
};

/**
 * Generate `count` consecutive ascending scale notes for a trumpet, starting from
 * the scale root at the lowest octave that reaches the instrument's range. Octaves
 * follow scientific pitch (they roll over when the pitch class crosses C), so the
 * run ascends monotonically; notes above the charted range are still returned and
 * render without a fingering, exactly like an out-of-range flute note.
 */
export const getTrumpetScaleNotes = (
  scale: Scale,
  count: number,
  trumpet: TrumpetType
): NoteWithOctave[] => {
  if (count <= 0) return [];
  if (!scale.root || !scale.type) {
    throw new Error("Invalid scale: missing root or type");
  }

  const scaleNotes = getScaleNotes(scale);
  if (scaleNotes.length === 0) return [];

  const result: NoteWithOctave[] = [];
  let octave = getTrumpetStartOctave(scale, trumpet);
  let prevPc = CHROMATIC_INDEX[scaleNotes[0]] ?? 0;

  for (let i = 0; i < count; i++) {
    const note = scaleNotes[i % scaleNotes.length];
    const pc = CHROMATIC_INDEX[note] ?? 0;
    // Roll the octave over whenever the pitch class does not keep rising (crossed C).
    if (i > 0 && pc <= prevPc) {
      octave += 1;
    }
    result.push(`${note}${octave}` as NoteWithOctave);
    prevPc = pc;
  }

  return result;
};

/**
 * Look up the primary valve fingering for a concert-pitch note on a given trumpet.
 * The note is transposed to written pitch first (what the player reads), then
 * matched against the chart. Returns null when the note is outside the charted
 * range — the diagram then shows no pressed valves.
 */
export function getTrumpetFingering(
  note: NoteWithOctave,
  trumpet: TrumpetType
): TrumpetFingering | null {
  const concert = getAbsolutePitch(note);
  if (concert === null) return null;

  const written = concert + trumpet.transposition;
  const valves = TRUMPET_FINGERING_BY_WRITTEN_PITCH[written];
  if (!valves) return null;

  return { writtenPitch: written, valves };
}
