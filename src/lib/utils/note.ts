export type Note =
  | "A"
  | "A#"
  | "B"
  | "Bb"
  | "C"
  | "C#"
  | "Db"
  | "D"
  | "D#"
  | "Eb"
  | "E"
  | "F"
  | "F#"
  | "Gb"
  | "G"
  | "G#"
  | "Ab";
  
// Note with octave number (e.g., "C4", "G#3")
export type NoteWithOctave = `${Note}${number}` | Note;

const SOLFEGE_MAP: Record<string, string> = {
  C: "Do",
  D: "Ré",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si",
};

const SOLFEGE_MAP_ES: Record<string, string> = {
  C: "Do",
  D: "Re",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si",
};

export function getLocalizedNoteName(
  note: Note,
  locale: string,
  showFlats: boolean
): string {
  const base = note.charAt(0);
  const accidental = note.length > 1 ? note.charAt(1) : "";

  if (locale === "en") {
    if (!accidental) return base;
    return showFlats ? applyFlatSpelling(note) : note;
  }

  const map = locale === "es" ? SOLFEGE_MAP_ES : SOLFEGE_MAP;
  const solfege = map[base] ?? base;

  if (!accidental) return solfege;

  if (showFlats) {
    return `${solfege}♭`;
  }
  return `${solfege}♯`;
}

function applyFlatSpelling(note: Note): Note {
  const flatEquivalents: Record<string, Note> = {
    "A#": "Bb",
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab",
  };
  return flatEquivalents[note] ?? note;
}
