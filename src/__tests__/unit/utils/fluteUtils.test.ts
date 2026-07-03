/**
 * Tests for flute utilities (T008, T009)
 */

import { getConsecutiveScaleNotes, getFluteFingering } from "@/lib/utils/fluteUtils";
import { FLUTE_KEY_DEFINITIONS } from "@/app/flute/fluteFingerings";
import { Scale } from "@/lib/utils/scaleType";

describe("getConsecutiveScaleNotes (T008)", () => {
  const cMajor: Scale = { root: "C", type: "major", mode: "ionian" };

  it("returns 7 notes for C Major starting at C4", () => {
    const result = getConsecutiveScaleNotes(cMajor, 7);
    expect(result).toEqual(["C4", "D4", "E4", "F4", "G4", "A4", "B4"]);
  });

  it("wraps to next octave when count exceeds scale length", () => {
    const result = getConsecutiveScaleNotes(cMajor, 12);
    expect(result).toEqual([
      "C4", "D4", "E4", "F4", "G4", "A4", "B4",
      "C5", "D5", "E5", "F5", "G5",
    ]);
  });

  it("spans two octaves for pentatonic with count 10", () => {
    const pentatonic: Scale = { root: "C", type: "pentatonic", mode: "ionian" };
    const result = getConsecutiveScaleNotes(pentatonic, 10);
    expect(result).toEqual([
      "C4", "D4", "E4", "G4", "A4",
      "C5", "D5", "E5", "G5", "A5",
    ]);
  });

  it("returns empty array for count <= 0", () => {
    expect(getConsecutiveScaleNotes(cMajor, 0)).toEqual([]);
    expect(getConsecutiveScaleNotes(cMajor, -1)).toEqual([]);
  });

  it("throws for invalid scale", () => {
    expect(() => getConsecutiveScaleNotes({ root: "C", type: "", mode: "ionian" }, 5)).toThrow();
  });
});

describe("getFluteFingering (T009)", () => {
  it("returns all-main-keys-closed for C4", () => {
    const result = getFluteFingering("C4");
    expect(result).not.toBeNull();
    expect(result!.note).toBe("C4");
    expect(result!.keys).toHaveLength(FLUTE_KEY_DEFINITIONS.length);
    // Main keys (thumb + l1-l3 + r1-r3) should be closed
    const mainKeys = result!.keys.slice(0, 7);
    expect(mainKeys.every((k) => k.closed)).toBe(true);
  });

  it("returns null for out-of-range note", () => {
    expect(getFluteFingering("C3")).toBeNull();
    expect(getFluteFingering("C8")).toBeNull();
  });

  it("returns keys array matching FLUTE_KEY_DEFINITIONS length", () => {
    const result = getFluteFingering("G4");
    expect(result).not.toBeNull();
    expect(result!.keys.length).toBe(FLUTE_KEY_DEFINITIONS.length);
  });

  it("normalizes flat notes to sharps for lookup", () => {
    const dbResult = getFluteFingering("Db4");
    const csharpResult = getFluteFingering("C#4");
    expect(dbResult).not.toBeNull();
    expect(csharpResult).not.toBeNull();
    expect(dbResult!.keys.map((k) => k.closed)).toEqual(
      csharpResult!.keys.map((k) => k.closed)
    );
  });
});
