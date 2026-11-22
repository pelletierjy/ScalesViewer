/**
 * Tests for trumpet utilities: transposition to written pitch, chart lookups,
 * range handling and scale-note generation.
 */

import {
  getTrumpetFingering,
  getTrumpetRange,
  getTrumpetScaleNotes,
  getTrumpetStartOctave,
} from "@/lib/utils/trumpetUtils";
import { getTrumpetType } from "@/instruments/trumpet/trumpetFingerings";
import { Scale } from "@/lib/utils/scaleType";

const bb = getTrumpetType("bb"); // B♭ trumpet: reads a whole step higher
const cTrumpet = getTrumpetType("c"); // C trumpet: reads what it sounds

const cMajor: Scale = { root: "C", type: "major", mode: "ionian" };

describe("getTrumpetRange", () => {
  it("shifts the charted written range down by the transposition", () => {
    // Written F#3–D6 → concert E3–C6 on a B♭ trumpet, unchanged on a C trumpet.
    expect(getTrumpetRange(bb)).toEqual({ low: 40, high: 72 });
    expect(getTrumpetRange(cTrumpet)).toEqual({ low: 42, high: 74 });
  });
});

describe("getTrumpetFingering", () => {
  it("transposes concert pitch to written pitch before looking up", () => {
    // Concert C4 sounds written D4 on a B♭ trumpet → valves 1 and 3.
    expect(getTrumpetFingering("C4", bb)).toEqual({
      writtenPitch: 50,
      valves: [1, 3],
    });
    // The same concert pitch on a C trumpet is written C4 → open.
    expect(getTrumpetFingering("C4", cTrumpet)).toEqual({
      writtenPitch: 48,
      valves: [],
    });
  });

  it("gives the lowest standard note as all three valves", () => {
    // Concert E3 = written F#3, the bottom of the B♭ trumpet's range.
    expect(getTrumpetFingering("E3", bb)?.valves).toEqual([1, 2, 3]);
    expect(getTrumpetFingering("E3", bb)?.writtenPitch).toBe(42);
  });

  it("reads concert B♭ as open, because it is written middle C", () => {
    expect(getTrumpetFingering("Bb3", bb)?.valves).toEqual([]);
    expect(getTrumpetFingering("Bb4", bb)?.valves).toEqual([]);
  });

  it("treats enharmonic spellings as the same fingering", () => {
    expect(getTrumpetFingering("Gb4", bb)).toEqual(getTrumpetFingering("F#4", bb));
    expect(getTrumpetFingering("Db4", bb)).toEqual(getTrumpetFingering("C#4", bb));
    // Concert Db4 = written Eb4 → valves 2 and 3.
    expect(getTrumpetFingering("Db4", bb)?.valves).toEqual([2, 3]);
  });

  it("returns null outside the charted range", () => {
    // Concert C#6 is written D#6 — one step past the top of the chart.
    expect(getTrumpetFingering("C#6", bb)).toBeNull();
    expect(getTrumpetFingering("E2", bb)).toBeNull();
    // On a C trumpet the same notes sit one step lower on the written chart.
    expect(getTrumpetFingering("D6", bb)).toBeNull();
    expect(getTrumpetFingering("D6", cTrumpet)).not.toBeNull();
  });

  it("returns null for an unparsable note", () => {
    expect(getTrumpetFingering("H4" as never, bb)).toBeNull();
  });
});

describe("getTrumpetStartOctave", () => {
  it("picks the lowest octave whose root reaches the instrument's range", () => {
    expect(getTrumpetStartOctave(cMajor, bb)).toBe(4);
    expect(getTrumpetStartOctave({ ...cMajor, root: "F" }, bb)).toBe(3); // F3 ≥ E3
    expect(getTrumpetStartOctave({ ...cMajor, root: "B" }, bb)).toBe(3); // B3 ≥ E3
  });
});

describe("getTrumpetScaleNotes", () => {
  it("generates consecutive notes that ascend across the octave", () => {
    expect(getTrumpetScaleNotes(cMajor, 8, bb)).toEqual([
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C5",
    ]);
  });

  it("returns exactly as many notes as requested, even past the chart", () => {
    const notes = getTrumpetScaleNotes(cMajor, 16, bb);
    expect(notes).toHaveLength(16);
    expect(notes[notes.length - 1]).toBe("D6");
    // Anything above concert C6 is off the chart but still displayed.
    expect(getTrumpetFingering(notes[notes.length - 1], bb)).toBeNull();
  });

  it("starts from the instrument's range instead of a fixed octave", () => {
    const gMajor: Scale = { root: "G", type: "major", mode: "ionian" };
    const notes = getTrumpetScaleNotes(gMajor, 3, bb);
    expect(notes[0]).toBe("G3"); // G3 is above the concert low E3
    expect(notes).toEqual(["G3", "A3", "B3"]);
  });

  it("throws on an invalid scale and returns nothing for a non-positive count", () => {
    expect(() => getTrumpetScaleNotes({ root: "C" } as Scale, 4, bb)).toThrow();
    expect(getTrumpetScaleNotes(cMajor, 0, bb)).toEqual([]);
  });
});
