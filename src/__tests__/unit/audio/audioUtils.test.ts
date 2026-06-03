/**
 * Spec: specs/instrument-audio/spec.md — FR-003, FR-004, FR-005, FR-012
 */

import {
  calculateFrequency,
  playNote,
  initializeAudio,
  resetAudioContextForTests,
} from "@/lib/utils/audioUtils";
import * as samplePlayer from "@/lib/audio/samplePlayer";
import * as pluckSynth from "@/lib/audio/pluckSynth";

jest.mock("@/lib/audio/samplePlayer");
jest.mock("@/lib/audio/pluckSynth");

const mockPlaySample = samplePlayer.playSample as jest.MockedFunction<
  typeof samplePlayer.playSample
>;
const mockLoadInstrumentSample =
  samplePlayer.loadInstrumentSample as jest.MockedFunction<
    typeof samplePlayer.loadInstrumentSample
  >;
const mockPlayPluckSynth = pluckSynth.playPluckSynth as jest.MockedFunction<
  typeof pluckSynth.playPluckSynth
>;

function createMockContext(): AudioContext {
  const gainNode = {
    gain: {
      setValueAtTime: jest.fn(),
      linearRampToValueAtTime: jest.fn(),
      exponentialRampToValueAtTime: jest.fn(),
    },
    connect: jest.fn(),
    disconnect: jest.fn(),
  };
  const oscillator = {
    type: "sine",
    frequency: { setValueAtTime: jest.fn() },
    connect: jest.fn(),
    disconnect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    onended: null as (() => void) | null,
  };

  return {
    currentTime: 0,
    sampleRate: 44100,
    state: "running",
    destination: {},
    createOscillator: jest.fn(() => oscillator),
    createGain: jest.fn(() => gainNode),
    resume: jest.fn().mockResolvedValue(undefined),
  } as unknown as AudioContext;
}

describe("calculateFrequency (FR-005)", () => {
  it("returns 440 Hz for A4 without octave shift", () => {
    expect(calculateFrequency("A4")).toBeCloseTo(440, 0);
  });

  it("returns 261.63 Hz for C4", () => {
    expect(calculateFrequency("C4")).toBeCloseTo(261.63, 0);
  });
});

describe("playNote routing", () => {
  let mockCtx: AudioContext;

  beforeEach(async () => {
    jest.clearAllMocks();
    resetAudioContextForTests();
    mockCtx = createMockContext();
    const AudioContextMock = jest.fn(() => mockCtx);
    global.AudioContext = AudioContextMock as unknown as typeof AudioContext;
    global.window = global.window ?? ({} as Window & typeof globalThis);
    (global.window as Window & { AudioContext: typeof AudioContext }).AudioContext =
      AudioContextMock as unknown as typeof AudioContext;
    mockLoadInstrumentSample.mockResolvedValue({ duration: 0.5 } as AudioBuffer);
    await initializeAudio();
  });

  afterEach(() => {
    resetAudioContextForTests();
  });

  it("FR-009: uses sine oscillator when soundEngine is sine", async () => {
    await playNote("C4", "initialized", 0.5, {
      instrument: "guitar",
      soundEngine: "sine",
    });

    expect(mockCtx.createOscillator).toHaveBeenCalled();
    expect(mockPlayPluckSynth).not.toHaveBeenCalled();
    expect(mockLoadInstrumentSample).not.toHaveBeenCalled();
  });

  it("FR-007: uses pluck synth for guitar when soundEngine is synth", async () => {
    await playNote("E3", "initialized", 0.5, {
      instrument: "guitar",
      soundEngine: "synth",
    });

    expect(mockPlayPluckSynth).toHaveBeenCalledWith(
      mockCtx,
      expect.any(Number),
      0.5
    );
    expect(mockLoadInstrumentSample).not.toHaveBeenCalled();
  });

  it("FR-003: uses sample when soundEngine is sample", async () => {
    await playNote("C4", "initialized", 0.5, {
      instrument: "piano",
      soundEngine: "sample",
    });

    expect(mockLoadInstrumentSample).toHaveBeenCalledWith(mockCtx, "piano");
    expect(mockPlaySample).toHaveBeenCalled();
    expect(mockPlayPluckSynth).not.toHaveBeenCalled();
  });

  it("FR-012: falls back to sine when sample load fails", async () => {
    mockLoadInstrumentSample.mockResolvedValue(null);

    await playNote("C4", "initialized", 0.5, {
      instrument: "piano",
      soundEngine: "sample",
    });

    expect(mockCtx.createOscillator).toHaveBeenCalled();
    expect(mockPlaySample).not.toHaveBeenCalled();
  });
});
