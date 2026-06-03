import { Note, NoteWithOctave } from "./note";
import { AudioStatus } from "@/features/audio/audioSlice";
import { Instrument } from "./instrument";
import { SoundEngine } from "@/lib/audio/instrumentSampleConfig";
import { resolvePlaybackStrategy } from "@/lib/audio/playbackStrategy";
import { INSTRUMENT_SAMPLES } from "@/lib/audio/instrumentSampleConfig";
import {
  loadInstrumentSample,
  playSample,
  applyGainEnvelope,
} from "@/lib/audio/samplePlayer";
import { playPluckSynth } from "@/lib/audio/pluckSynth";

// Base frequencies for notes in octave 4 (A4 = 440Hz)
const BASE_FREQUENCIES: Record<Note, number> = {
  C: 261.63,
  "C#": 277.18,
  Db: 277.18,
  D: 293.66,
  "D#": 311.13,
  Eb: 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  Gb: 369.99,
  G: 392.0,
  "G#": 415.3,
  Ab: 415.3,
  A: 440.0,
  "A#": 466.16,
  Bb: 466.16,
  B: 493.88,
};

let audioContext: AudioContext | null = null;

export interface PlayNoteOptions {
  instrument: Instrument;
  soundEngine: SoundEngine;
}

const getBaseNote = (note: NoteWithOctave): Note => {
  return note.replace(/\d+$/, "") as Note;
};

const getOctave = (note: NoteWithOctave): number => {
  const match = note.match(/\d+$/);
  return match ? parseInt(match[0], 10) : 4;
};

export const calculateFrequency = (note: NoteWithOctave): number => {
  const baseNote = getBaseNote(note);
  const octave = getOctave(note);

  const baseFreq = BASE_FREQUENCIES[baseNote];
  if (!baseFreq) {
    console.warn(`Unknown note: ${baseNote}`);
    return 440;
  }

  const noteOrder = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const baseNoteIndex = noteOrder.indexOf(baseNote.replace(/b/, "#"));
  const octaveOffset = octave - 4;
  const semitonesFromA4 = baseNoteIndex - 9 + octaveOffset * 12;

  return 440 * Math.pow(2, semitonesFromA4 / 12);
};

export const getAudioContext = (): AudioContext | null => audioContext;

/** @internal Test-only reset for isolated playNote tests */
export function resetAudioContextForTests(): void {
  audioContext = null;
}

export const initializeAudio = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;

  try {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    return true;
  } catch (error) {
    console.warn("Failed to initialize audio context:", error);
    return false;
  }
};

async function ensureAudioContext(
  audioStatus: AudioStatus
): Promise<AudioContext | null> {
  if (!audioContext || audioStatus !== "initialized") {
    const initialized = await initializeAudio();
    if (!initialized || !audioContext) {
      console.warn("Failed to initialize audio context");
      return null;
    }
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  return audioContext;
}

function playSineWave(
  ctx: AudioContext,
  frequency: number,
  duration: number
): void {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  applyGainEnvelope(ctx, gainNode, duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + duration);

  oscillator.onended = () => {
    oscillator.disconnect();
    gainNode.disconnect();
  };
}

async function playWithSample(
  ctx: AudioContext,
  instrument: Instrument,
  frequency: number,
  duration: number
): Promise<boolean> {
  const buffer = await loadInstrumentSample(ctx, instrument);
  if (!buffer) return false;

  const { rootNote } = INSTRUMENT_SAMPLES[instrument];
  const rootHz = calculateFrequency(rootNote);
  playSample(ctx, buffer, frequency, rootHz, duration);
  return true;
}

export async function playNote(
  note: NoteWithOctave,
  audioStatus: AudioStatus,
  duration: number = 0.5,
  options: PlayNoteOptions
): Promise<void> {
  if (typeof window === "undefined") return;

  const ctx = await ensureAudioContext(audioStatus);
  if (!ctx) return;

  const { instrument, soundEngine } = options;
  const frequency = calculateFrequency(note);
  const strategy = resolvePlaybackStrategy(instrument, soundEngine);

  try {
    if (strategy === "sine") {
      playSineWave(ctx, frequency, duration);
      return;
    }

    if (strategy === "pluck") {
      playPluckSynth(ctx, frequency, duration);
      return;
    }

    const played = await playWithSample(ctx, instrument, frequency, duration);
    if (played) return;

    playSineWave(ctx, frequency, duration);
  } catch (error) {
    console.warn("Failed to play note:", error);
  }
}
