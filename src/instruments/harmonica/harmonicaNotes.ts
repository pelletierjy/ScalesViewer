import { Note } from "@/lib/utils/note";
import { getInterval, transposeNote } from "@/lib/utils/scaleUtils";

// Common harmonica keys
export const HARMONICA_KEYS: Note[] = ["C", "G", "A", "D", "F", "Bb", "Eb"];

// Standard 10-hole diatonic harmonica layout in C
const BASE_HARMONICA_NOTES = {
  blow: ["C", "E", "G", "C", "E", "G", "C", "E", "G", "C"] as Note[],
  draw: ["D", "G", "B", "D", "F", "A", "B", "D", "F", "A"] as Note[],
};

export const transposeHarmonicaNotes = (
  key: Note
): { blow: Note[]; draw: Note[] } => {
  if (key === "C") return BASE_HARMONICA_NOTES;

  const interval = getInterval("C", key);
  return {
    blow: BASE_HARMONICA_NOTES.blow.map((note) =>
      transposeNote(note, interval)
    ) as Note[],
    draw: BASE_HARMONICA_NOTES.draw.map((note) =>
      transposeNote(note, interval)
    ) as Note[],
  };
};
