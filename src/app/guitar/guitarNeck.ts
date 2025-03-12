import { GuitarString } from "./types/guitarString";

export interface GuitarNeck {
  strings: GuitarString[];
  fretCount: number;
  startFret: number;
  endFret: number;
}
