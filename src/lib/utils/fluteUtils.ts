import { NoteWithOctave, Note } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { getScaleNotes } from "@/lib/utils/scaleUtils";
import {
  FLUTE_KEY_DEFINITIONS,
  FLUTE_FINGERING_MAP,
  FluteFingering,
} from "@/app/flute/fluteFingerings";

const FLAT_TO_SHARP: Partial<Record<Note, Note>> = {
  Bb: "A#",
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
};

/**
 * Generate consecutive scale notes starting at scale.root in startOctave (default 4),
 * wrapping through scale degrees and incrementing octave when cycling past the highest degree.
 */
export const getConsecutiveScaleNotes = (
  scale: Scale,
  count: number,
  startOctave: number = 4
): NoteWithOctave[] => {
  if (count <= 0) return [];
  if (!scale.root || !scale.type) {
    throw new Error("Invalid scale: missing root or type");
  }

  const scaleNotes = getScaleNotes(scale);
  if (scaleNotes.length === 0) return [];

  const result: NoteWithOctave[] = [];
  let octave = startOctave;

  for (let i = 0; i < count; i++) {
    const noteIndex = i % scaleNotes.length;
    const note = scaleNotes[noteIndex];
    if (i > 0 && noteIndex === 0) {
      octave += 1;
    }
    result.push(`${note}${octave}` as NoteWithOctave);
  }

  return result;
};

/**
 * Look up the primary Boehm-system fingering for a given note.
 * Returns null if the note is outside the supported range (C4–C7).
 */
export function getFluteFingering(note: NoteWithOctave): FluteFingering | null {
  const match = note.match(/^([A-G][#b]?)(\d+)$/);
  if (!match) return null;

  const noteName = match[1] as Note;
  const octave = parseInt(match[2], 10);

  // Normalize flat notes to sharps for lookup
  const normalizedNote = FLAT_TO_SHARP[noteName] || noteName;
  const normalizedKey = `${normalizedNote}${octave}` as NoteWithOctave;

  const fingering = FLUTE_FINGERING_MAP[normalizedKey];
  if (!fingering) return null;

  return {
    note,
    keys: FLUTE_KEY_DEFINITIONS.map((def, i) => ({
      keyId: def.keyId,
      closed: fingering[i],
      label: def.label,
    })),
  };
}
