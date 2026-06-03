/**
 * Unit tests for patternUtils.ts
 * TDD: write failing test first, then implement.
 */

import {
  getScaleNoteByDegree,
  getPatternNotes,
  PRESET_PATTERNS,
  type MelodicPattern,
} from "../../../lib/utils/patternUtils";
import { createScale } from "../../utils/musicTestUtils";

describe("patternUtils", () => {
  describe("getScaleNoteByDegree", () => {
    it("should return correct note for each degree of C major", () => {
      const cMajor = createScale("C", "ionian");
      expect(getScaleNoteByDegree(cMajor, 1)).toBe("C");
      expect(getScaleNoteByDegree(cMajor, 2)).toBe("D");
      expect(getScaleNoteByDegree(cMajor, 3)).toBe("E");
      expect(getScaleNoteByDegree(cMajor, 4)).toBe("F");
      expect(getScaleNoteByDegree(cMajor, 5)).toBe("G");
      expect(getScaleNoteByDegree(cMajor, 6)).toBe("A");
      expect(getScaleNoteByDegree(cMajor, 7)).toBe("B");
    });

    it("should return correct note for each degree of G major", () => {
      const gMajor = createScale("G", "ionian");
      expect(getScaleNoteByDegree(gMajor, 1)).toBe("G");
      expect(getScaleNoteByDegree(gMajor, 2)).toBe("A");
      expect(getScaleNoteByDegree(gMajor, 3)).toBe("B");
      expect(getScaleNoteByDegree(gMajor, 4)).toBe("C");
      expect(getScaleNoteByDegree(gMajor, 5)).toBe("D");
      expect(getScaleNoteByDegree(gMajor, 6)).toBe("E");
      expect(getScaleNoteByDegree(gMajor, 7)).toBe("F#");
    });

    it("should handle minor scale degrees correctly", () => {
      const aMinor = createScale("A", "aeolian");
      expect(getScaleNoteByDegree(aMinor, 1)).toBe("A");
      expect(getScaleNoteByDegree(aMinor, 2)).toBe("B");
      expect(getScaleNoteByDegree(aMinor, 3)).toBe("C");
      expect(getScaleNoteByDegree(aMinor, 6)).toBe("F");
      expect(getScaleNoteByDegree(aMinor, 7)).toBe("G");
    });

    it("should clamp degree to valid range 1-7", () => {
      const cMajor = createScale("C", "ionian");
      expect(getScaleNoteByDegree(cMajor, 0)).toBe("C"); // clamps to 1
      expect(getScaleNoteByDegree(cMajor, 8)).toBe("B"); // clamps to 7
      expect(getScaleNoteByDegree(cMajor, -1)).toBe("C"); // clamps to 1
    });
  });

  describe("getPatternNotes", () => {
    it("should map 1-2-3-5 pattern to C major notes", () => {
      const pattern: MelodicPattern = {
        id: "1235",
        name: "1-2-3-5",
        steps: [1, 2, 3, 5],
      };
      const cMajor = createScale("C", "ionian");
      expect(getPatternNotes(pattern, cMajor)).toEqual(["C", "D", "E", "G"]);
    });

    it("should transpose pattern diatonically to new root", () => {
      const pattern: MelodicPattern = {
        id: "1235",
        name: "1-2-3-5",
        steps: [1, 2, 3, 5],
      };
      const gMajor = createScale("G", "ionian");
      expect(getPatternNotes(pattern, gMajor)).toEqual(["G", "A", "B", "D"]);
    });

    it("should handle 1-3-5-7 pattern across modes", () => {
      const pattern: MelodicPattern = {
        id: "1357",
        name: "1-3-5-7",
        steps: [1, 3, 5, 7],
      };
      const dDorian = createScale("D", "dorian");
      expect(getPatternNotes(pattern, dDorian)).toEqual(["D", "F", "A", "C"]);
    });

    it("should handle single-step pattern", () => {
      const pattern: MelodicPattern = {
        id: "single",
        name: "Single",
        steps: [1],
      };
      const fMajor = createScale("F", "ionian");
      expect(getPatternNotes(pattern, fMajor)).toEqual(["F"]);
    });

    it("should return empty array for empty pattern", () => {
      const pattern: MelodicPattern = {
        id: "empty",
        name: "Empty",
        steps: [],
      };
      const cMajor = createScale("C", "ionian");
      expect(getPatternNotes(pattern, cMajor)).toEqual([]);
    });
  });

  describe("PRESET_PATTERNS", () => {
    it("should contain at least 4 preset patterns", () => {
      expect(PRESET_PATTERNS.length).toBeGreaterThanOrEqual(4);
    });

    it("should have valid ids and names", () => {
      PRESET_PATTERNS.forEach((p) => {
        expect(p.id).toBeTruthy();
        expect(p.name).toBeTruthy();
        expect(p.steps.length).toBeGreaterThan(0);
      });
    });

    it("should have steps within 1-7 range", () => {
      PRESET_PATTERNS.forEach((p) => {
        p.steps.forEach((step) => {
          expect(step).toBeGreaterThanOrEqual(1);
          expect(step).toBeLessThanOrEqual(7);
        });
      });
    });
  });
});
