import { Note } from "./note";

export type ChordQuality = "major" | "minor" | "diminished" | "augmented";

export interface Triad {
  root: Note;
  quality: ChordQuality;
  intervals: number[];
  symbol: string;
}
