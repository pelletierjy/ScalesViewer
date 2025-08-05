import { Note, NoteWithOctave } from "./note";

// Base frequencies for notes in octave 4 (A4 = 440Hz)
const BASE_FREQUENCIES: Record<Note, number> = {
  // Notes from C4 to B4
  C: 261.63, // C4
  "C#": 277.18, // C#4
  Db: 277.18, // Db4
  D: 293.66, // D4
  "D#": 311.13, // D#4
  Eb: 311.13, // Eb4
  E: 329.63, // E4
  F: 349.23, // F4
  "F#": 369.99, // F#4
  Gb: 369.99, // Gb4
  G: 392.0, // G4
  "G#": 415.3, // G#4
  Ab: 415.3, // Ab4
  A: 440.0, // A4
  "A#": 466.16, // A#4
  Bb: 466.16, // Bb4
  B: 493.88, // B4
};

let audioContext: AudioContext | null = null;
let isAudioInitialized = false;

const getBaseNote = (note: NoteWithOctave): Note => {
  return note.replace(/\d+$/, "") as Note;
};

const getOctave = (note: NoteWithOctave): number => {
  const match = note.match(/\d+$/);
  return match ? parseInt(match[0], 10) : 4; // Default to octave 4 if not specified
};

const calculateFrequency = (note: NoteWithOctave): number => {
  const baseNote = getBaseNote(note);
  const octave = getOctave(note);

  // Get the base frequency for the note
  const baseFreq = BASE_FREQUENCIES[baseNote];
  if (!baseFreq) {
    console.warn(`Unknown note: ${baseNote}`);
    return 440; // Default to A4 if note is unknown
  }

  // Calculate the number of semitones from A4 (440Hz)
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
  const octaveOffset = octave - 4; // Distance from octave 4

  // Calculate semitones from A4
  // A4 is at position 9 in our noteOrder array
  const semitonesFromA4 = baseNoteIndex - 9 + octaveOffset * 12;

  // Calculate frequency using the formula: f = 440 * 2^(n/12)
  // where n is the number of semitones from A4
  return 440 * Math.pow(2, semitonesFromA4 / 12);
};

// Initialize audio context with error handling
const initializeAudio = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  
  try {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    
    // Resume audio context if it's suspended (required for user gesture)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    isAudioInitialized = true;
    return true;
  } catch (error) {
    console.warn('Failed to initialize audio context:', error);
    return false;
  }
};

export const playNote = async (note: NoteWithOctave, duration: number = 0.5) => {
  // Skip during server-side rendering or when window is not available
  if (typeof window === "undefined") return;

  // Initialize audio if not already done
  if (!isAudioInitialized) {
    const initialized = await initializeAudio();
    if (!initialized) {
      console.warn('Audio playback not available');
      return;
    }
  }
  
  if (!audioContext) return;

  try {
    // Play the note one octave higher by adding 1 to the octave number
    const baseNote = getBaseNote(note);
    const originalOctave = getOctave(note);
    const higherOctaveNote = `${baseNote}${originalOctave + 1}` as NoteWithOctave;
    const frequency = calculateFrequency(higherOctaveNote);

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Use a sine wave for a more pleasant sound
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    // Apply envelope for smoother sound
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + duration
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
    
    // Clean up oscillator after use
    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  } catch (error) {
    console.warn('Failed to play note:', error);
  }
};
