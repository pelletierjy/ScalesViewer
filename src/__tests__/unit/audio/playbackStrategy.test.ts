/**
 * Spec: specs/instrument-audio/spec.md — FR-007, FR-008, FR-009
 */

import { resolvePlaybackStrategy } from "@/lib/audio/playbackStrategy";
import { Instrument } from "@/lib/utils/instrument";

describe("resolvePlaybackStrategy", () => {
  describe("FR-009: classic sine", () => {
    it.each<Instrument>(["guitar", "piano", "kalimba", "harmonica"])(
      "returns sine for %s when soundEngine is sine",
      (instrument) => {
        expect(resolvePlaybackStrategy(instrument, "sine")).toBe("sine");
      }
    );
  });

  describe("FR-007: pluck synth on guitar and kalimba", () => {
    it("returns pluck for guitar with synth engine", () => {
      expect(resolvePlaybackStrategy("guitar", "synth")).toBe("pluck");
    });

    it("returns pluck for kalimba with synth engine", () => {
      expect(resolvePlaybackStrategy("kalimba", "synth")).toBe("pluck");
    });
  });

  describe("FR-008: sample for piano and harmonica when synth selected", () => {
    it("returns sample for piano with synth engine", () => {
      expect(resolvePlaybackStrategy("piano", "synth")).toBe("sample");
    });

    it("returns sample for harmonica with synth engine", () => {
      expect(resolvePlaybackStrategy("harmonica", "synth")).toBe("sample");
    });
  });

  describe("FR-003: sample engine", () => {
    it.each<Instrument>(["guitar", "piano", "kalimba", "harmonica"])(
      "returns sample for %s when soundEngine is sample",
      (instrument) => {
        expect(resolvePlaybackStrategy(instrument, "sample")).toBe("sample");
      }
    );
  });
});
