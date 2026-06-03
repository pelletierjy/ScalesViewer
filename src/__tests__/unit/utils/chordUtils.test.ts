/**
 * Unit tests for chordUtils.ts
 * Spec-driven: validates diatonic triad generation, chord-tone logic,
 * shared-tone detection, and display labels.
 */

import {
  getDiatonicTriads,
  getChordTones,
  getToneOccurrences,
  isToneShared,
  getTriadDisplayLabel,
} from "../../../lib/utils/chordUtils";
import { Triad } from "../../../lib/utils/chordTypes";
import { Note } from "../../../lib/utils/note";
import { createScale } from "../../utils/musicTestUtils";
import { getScaleNotes } from "../../../lib/utils/scaleUtils";

describe("chordUtils", () => {
  describe("getDiatonicTriads", () => {
    it("should return 7 triads for a major scale", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      expect(triads).toHaveLength(7);
    });

    it("should return empty array for non-7-note scales", () => {
      const pentatonic: Note[] = ["C", "D", "E", "G", "A"];
      expect(getDiatonicTriads(pentatonic)).toEqual([]);
    });

    it("should generate correct qualities for C major ionian", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      const qualities = triads.map((t) => t.quality);
      expect(qualities).toEqual([
        "major",
        "minor",
        "minor",
        "major",
        "major",
        "minor",
        "diminished",
      ]);
    });

    it("should generate correct symbols for C major ionian", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      const symbols = triads.map((t) => t.symbol);
      expect(symbols).toEqual(["C", "Dm", "Em", "F", "G", "Am", "Bdim"]);
    });

    it("should generate correct roots in scale order", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      const roots = triads.map((t) => t.root);
      expect(roots).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
    });

    it("should handle G major correctly", () => {
      const gMajor = getScaleNotes(createScale("G", "ionian"));
      const triads = getDiatonicTriads(gMajor);
      expect(triads.map((t) => t.symbol)).toEqual([
        "G",
        "Am",
        "Bm",
        "C",
        "D",
        "Em",
        "F#dim",
      ]);
    });

    it("should handle A minor (aeolian) correctly", () => {
      const aMinor = getScaleNotes(createScale("A", "aeolian"));
      const triads = getDiatonicTriads(aMinor);
      expect(triads.map((t) => t.symbol)).toEqual([
        "Am",
        "Bdim",
        "C",
        "Dm",
        "Em",
        "F",
        "G",
      ]);
    });

    it("should handle flat-root scales (Db major)", () => {
      const dbMajor = getScaleNotes(createScale("Db", "ionian"));
      const triads = getDiatonicTriads(dbMajor);
      expect(triads.map((t) => t.quality)).toEqual([
        "major",
        "minor",
        "minor",
        "major",
        "major",
        "minor",
        "diminished",
      ]);
      // Roots should preserve flat notation
      expect(triads.map((t) => t.root)).toEqual([
        "Db",
        "Eb",
        "F",
        "Gb",
        "Ab",
        "Bb",
        "C",
      ]);
    });

    it("should include intervals [3,4] for third and [6,7,8] for fifth", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      triads.forEach((triad) => {
        expect(triad.intervals).toHaveLength(2);
        const [third, fifth] = triad.intervals;
        expect([3, 4]).toContain(third);
        expect([6, 7, 8]).toContain(fifth);
      });
    });
  });

  describe("getChordTones", () => {
    it("should return root, third, and fifth for a major triad", () => {
      const triad: Triad = {
        root: "C",
        quality: "major",
        intervals: [4, 7],
        symbol: "C",
      };
      expect(getChordTones(triad)).toEqual(["C", "E", "G"]);
    });

    it("should return root, third, and fifth for a minor triad", () => {
      const triad: Triad = {
        root: "A",
        quality: "minor",
        intervals: [3, 7],
        symbol: "Am",
      };
      expect(getChordTones(triad)).toEqual(["A", "C", "E"]);
    });

    it("should return root, third, and fifth for a diminished triad", () => {
      const triad: Triad = {
        root: "B",
        quality: "diminished",
        intervals: [3, 6],
        symbol: "Bdim",
      };
      expect(getChordTones(triad)).toEqual(["B", "D", "F"]);
    });

    it("should return root, third, and fifth for an augmented triad", () => {
      const triad: Triad = {
        root: "C",
        quality: "augmented",
        intervals: [4, 8],
        symbol: "Caug",
      };
      expect(getChordTones(triad)).toEqual(["C", "E", "G#"]);
    });

    it("should preserve flat notation for flat roots", () => {
      const triad: Triad = {
        root: "Db",
        quality: "minor",
        intervals: [3, 7],
        symbol: "Dbm",
      };
      expect(getChordTones(triad)).toEqual(["Db", "E", "Ab"]);
    });
  });

  describe("getToneOccurrences", () => {
    it("should return 0 for a tone not present in any triad", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      expect(getToneOccurrences("C#" as Note, triads)).toBe(0);
    });

    it("should return 3 for the tonic tone present in I, IV, V (major scale)", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      // C is in C major, F major, and A minor? Wait...
      // C major: C-E-G
      // F major: F-A-C
      // A minor: A-C-E
      // Actually C is in I (C), IV (F), and vi (Am) -> 3 occurrences
      expect(getToneOccurrences("C", triads)).toBe(3);
    });

    it("should return 3 for the supertonic tone present in ii, V, and vii°", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      // D is in Dm, G major, and Bdim
      expect(getToneOccurrences("D", triads)).toBe(3);
    });

    it("should work correctly for flat-root scales", () => {
      const dbMajor = getScaleNotes(createScale("Db", "ionian"));
      const triads = getDiatonicTriads(dbMajor);
      // Db should be in Db major, Gb major, and Bb minor
      expect(getToneOccurrences("Db", triads)).toBe(3);
    });
  });

  describe("isToneShared", () => {
    it("should return false for a tone appearing in only one triad", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      // In a major scale, every diatonic tone appears in at least 2 triads
      // Let's construct a minimal case
      const singleTriad: Triad[] = [
        { root: "C", quality: "major", intervals: [4, 7], symbol: "C" },
      ];
      expect(isToneShared("E", singleTriad)).toBe(false);
    });

    it("should return true for a tone appearing in multiple triads", () => {
      const cMajor = getScaleNotes(createScale("C", "ionian"));
      const triads = getDiatonicTriads(cMajor);
      expect(isToneShared("C", triads)).toBe(true);
    });

    it("should return false for empty triads array", () => {
      expect(isToneShared("C", [])).toBe(false);
    });

    it("should correctly identify shared tones in flat-root scales", () => {
      const dbMajor = getScaleNotes(createScale("Db", "ionian"));
      const triads = getDiatonicTriads(dbMajor);
      expect(isToneShared("Db", triads)).toBe(true);
      expect(isToneShared("F", triads)).toBe(true);
    });
  });

  describe("getTriadDisplayLabel", () => {
    it("should display major triad as just the root", () => {
      const triad: Triad = {
        root: "C",
        quality: "major",
        intervals: [4, 7],
        symbol: "C",
      };
      expect(getTriadDisplayLabel(triad, false)).toBe("C");
    });

    it("should display minor triad with 'm' suffix", () => {
      const triad: Triad = {
        root: "D",
        quality: "minor",
        intervals: [3, 7],
        symbol: "Dm",
      };
      expect(getTriadDisplayLabel(triad, false)).toBe("Dm");
    });

    it("should display diminished triad with 'dim' suffix", () => {
      const triad: Triad = {
        root: "B",
        quality: "diminished",
        intervals: [3, 6],
        symbol: "Bdim",
      };
      expect(getTriadDisplayLabel(triad, false)).toBe("Bdim");
    });

    it("should display augmented triad with 'aug' suffix", () => {
      const triad: Triad = {
        root: "C",
        quality: "augmented",
        intervals: [4, 8],
        symbol: "Caug",
      };
      expect(getTriadDisplayLabel(triad, false)).toBe("Caug");
    });

    it("should convert sharp roots to flats when showFlats is true", () => {
      const triad: Triad = {
        root: "F#",
        quality: "diminished",
        intervals: [3, 6],
        symbol: "F#dim",
      };
      expect(getTriadDisplayLabel(triad, true)).toBe("Gbdim");
    });

    it("should keep flat roots as flats when showFlats is true", () => {
      const triad: Triad = {
        root: "Bb",
        quality: "major",
        intervals: [4, 7],
        symbol: "Bb",
      };
      expect(getTriadDisplayLabel(triad, true)).toBe("Bb");
    });
  });
});
