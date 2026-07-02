import { Instrument } from "@/lib/utils/instrument";
import { NoteWithOctave } from "@/lib/utils/note";

export type SoundEngine = "sample" | "synth" | "sine";

export interface InstrumentSampleDef {
  url: string;
  rootNote: NoteWithOctave;
}

export const INSTRUMENT_SAMPLES: Record<Instrument, InstrumentSampleDef> = {
  guitar: { url: "/sounds/guitar.wav", rootNote: "E3" },
  piano: { url: "/sounds/piano.wav", rootNote: "C4" },
  kalimba: { url: "/sounds/kalimba.wav", rootNote: "C4" },
  harmonica: { url: "/sounds/harmonica.wav", rootNote: "C4" },
  flute: { url: "/sounds/flute.wav", rootNote: "C4" },
};

export const ALL_INSTRUMENTS: Instrument[] = [
  "guitar",
  "piano",
  "kalimba",
  "harmonica",
  "flute",
];

export const PLUCK_SYNTH_INSTRUMENTS: Instrument[] = ["guitar", "kalimba"];

export function usesPluckSynth(
  instrument: Instrument,
  soundEngine: SoundEngine
): boolean {
  return (
    soundEngine === "synth" && PLUCK_SYNTH_INSTRUMENTS.includes(instrument)
  );
}
