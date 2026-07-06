/**
 * Tests for recorder utilities.
 */

import {
  getAbsolutePitch,
  getRecorderBasePitch,
  getRecorderStartOctave,
  getRecorderScaleNotes,
  getRecorderFingering,
} from "@/lib/utils/recorderUtils";
import {
  RECORDER_HOLE_DEFINITIONS,
  getRecorderType,
} from "@/app/recorder/recorderFingerings";
import { Scale } from "@/lib/utils/scaleType";

const soprano = getRecorderType("soprano"); // in C, lowest C5
const alto = getRecorderType("alto"); // in F, lowest F4

describe("getAbsolutePitch", () => {
  it("computes semitone values with C0 = 0", () => {
    expect(getAbsolutePitch("C4")).toBe(48);
    expect(getAbsolutePitch("A4")).toBe(57);
    expect(getAbsolutePitch("C5")).toBe(60);
  });

  it("treats enharmonic flats and sharps equally", () => {
    expect(getAbsolutePitch("Db5")).toBe(getAbsolutePitch("C#5"));
  });

  it("returns null for malformed input", () => {
    expect(getAbsolutePitch("H4" as never)).toBeNull();
  });
});

describe("getRecorderBasePitch / getRecorderStartOctave", () => {
  it("anchors the base pitch at the lowest note of each size", () => {
    expect(getRecorderBasePitch(soprano)).toBe(getAbsolutePitch("C5"));
    expect(getRecorderBasePitch(alto)).toBe(getAbsolutePitch("F4"));
  });

  it("picks a start octave so the run begins at or above the lowest note", () => {
    // Soprano lowest is C5. A C-rooted scale should start at C5.
    const cMajor: Scale = { root: "C", type: "major", mode: "ionian" };
    expect(getRecorderStartOctave(cMajor, soprano)).toBe(5);
    // A4 (57) is below the soprano's lowest note C5 (60), so the run starts at A5.
    const aMajor: Scale = { root: "A", type: "major", mode: "ionian" };
    expect(getRecorderStartOctave(aMajor, soprano)).toBe(5);
  });
});

describe("getRecorderScaleNotes", () => {
  const aMajor: Scale = { root: "A", type: "major", mode: "ionian" };

  it("ascends monotonically with correct scientific-pitch octaves", () => {
    // Alto (in F, lowest F4): A major starts at A4 and every note is in range.
    const notes = getRecorderScaleNotes(aMajor, 8, alto);
    expect(notes).toEqual([
      "A4", "B4", "C#5", "D5", "E5", "F#5", "G#5", "A5",
    ]);
    // Pitches strictly increase.
    const pitches = notes.map((n) => getAbsolutePitch(n)!);
    for (let i = 1; i < pitches.length; i++) {
      expect(pitches[i]).toBeGreaterThan(pitches[i - 1]);
    }
  });

  it("keeps every generated note inside the charted fingering range", () => {
    const notes = getRecorderScaleNotes(aMajor, 12, alto);
    for (const n of notes) {
      expect(getRecorderFingering(n, alto)).not.toBeNull();
    }
  });

  it("returns an empty array for non-positive counts", () => {
    expect(getRecorderScaleNotes(aMajor, 0, alto)).toEqual([]);
  });
});

describe("getRecorderFingering", () => {
  it("returns all holes closed for the lowest note of a C recorder", () => {
    const f = getRecorderFingering("C5", soprano);
    expect(f).not.toBeNull();
    expect(f!.offset).toBe(0);
    expect(f!.holes).toHaveLength(RECORDER_HOLE_DEFINITIONS.length);
    expect(f!.holes.every((h) => h.state === "closed")).toBe(true);
  });

  it("returns all holes closed for the lowest note of an F recorder", () => {
    const f = getRecorderFingering("F4", alto);
    expect(f).not.toBeNull();
    expect(f!.offset).toBe(0);
    expect(f!.holes.every((h) => h.state === "closed")).toBe(true);
  });

  it("gives the same fingering shape for the same offset on C and F recorders", () => {
    // Offset 7 (a fifth up): G5 on soprano, C5 on alto.
    const g = getRecorderFingering("G5", soprano);
    const c = getRecorderFingering("C5", alto);
    expect(g).not.toBeNull();
    expect(c).not.toBeNull();
    expect(g!.offset).toBe(7);
    expect(c!.offset).toBe(7);
    expect(g!.holes.map((h) => h.state)).toEqual(c!.holes.map((h) => h.state));
  });

  it("marks the double holes 6 and 7 as such", () => {
    const f = getRecorderFingering("C5", soprano);
    const doubles = f!.holes.filter((h) => h.isDouble).map((h) => h.holeId);
    expect(doubles).toEqual(["h6", "h7"]);
  });

  it("returns null below and above the charted range", () => {
    expect(getRecorderFingering("B4", soprano)).toBeNull(); // below C5
    expect(getRecorderFingering("C8", soprano)).toBeNull(); // far above range
  });
});
