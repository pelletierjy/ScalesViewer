/**
 * Spec: specs/instrument-audio/spec.md — FR-001, FR-002
 */

import {
  ALL_INSTRUMENTS,
  INSTRUMENT_SAMPLES,
  PLUCK_SYNTH_INSTRUMENTS,
  usesPluckSynth,
} from "@/lib/audio/instrumentSampleConfig";
import { Instrument } from "@/lib/utils/instrument";

describe("instrumentSampleConfig (FR-001, FR-002)", () => {
  it.each(ALL_INSTRUMENTS)(
    "defines a static sample URL and root note for %s",
    (instrument: Instrument) => {
      const def = INSTRUMENT_SAMPLES[instrument];
      expect(def.url).toMatch(/^\/sounds\/\w+\.wav$/);
      expect(def.rootNote).toMatch(/^[A-G][#b]?[0-9]$/);
    }
  );

  it("covers all four instruments", () => {
    expect(ALL_INSTRUMENTS).toHaveLength(4);
    expect(new Set(ALL_INSTRUMENTS)).toEqual(
      new Set(["guitar", "piano", "kalimba", "harmonica"])
    );
  });

  it("enables pluck synth only for guitar and kalimba when engine is synth", () => {
    expect(PLUCK_SYNTH_INSTRUMENTS).toEqual(["guitar", "kalimba"]);
    expect(usesPluckSynth("guitar", "synth")).toBe(true);
    expect(usesPluckSynth("kalimba", "synth")).toBe(true);
    expect(usesPluckSynth("piano", "synth")).toBe(false);
    expect(usesPluckSynth("harmonica", "synth")).toBe(false);
    expect(usesPluckSynth("guitar", "sample")).toBe(false);
  });
});
