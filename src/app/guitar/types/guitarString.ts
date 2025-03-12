import { Note } from "@/lib/utils/note";

export interface GuitarString {
  scaleRoot: Note;
  frets: Array<{
    note: Note;
    isInScale: boolean;
    isRoot: boolean;
    position: number;
  }>;
}
