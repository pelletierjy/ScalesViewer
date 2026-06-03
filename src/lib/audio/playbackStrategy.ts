import { Instrument } from "@/lib/utils/instrument";
import { SoundEngine, usesPluckSynth } from "./instrumentSampleConfig";

export type PlaybackStrategy = "sine" | "pluck" | "sample";

/**
 * Pure routing for audio playback (spec FR-007–FR-009).
 * Does not account for sample load failure; playNote applies FR-012 fallback.
 */
export function resolvePlaybackStrategy(
  instrument: Instrument,
  soundEngine: SoundEngine
): PlaybackStrategy {
  if (soundEngine === "sine") {
    return "sine";
  }

  if (usesPluckSynth(instrument, soundEngine)) {
    return "pluck";
  }

  return "sample";
}
