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
