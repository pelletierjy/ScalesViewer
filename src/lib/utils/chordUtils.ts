import { Note as NoteType } from "./note";
import { getNoteAtInterval, getNoteIndex, SHARP_TO_FLAT } from "./scaleUtils";
import { Triad, ChordQuality } from "./chordTypes";

export type { Triad } from "./chordTypes";

const INTERVAL_TO_QUALITY: Record<number, ChordQuality> = {
  4: "major",
  3: "minor",
  6: "diminished",
  8: "augmented",
};

function normalize(n: NoteType): NoteType {
  return (
    {
      Bb: "A#",
      Db: "C#",
      Eb: "D#",
      Gb: "F#",
      Ab: "G#",
    } as Partial<Record<NoteType, NoteType>>
  )[n] || n;
}

function qualityFromIntervals(root: NoteType, intervals: number[]): ChordQuality {
  if (intervals.length === 2) {
    const thirdInterval = intervals[0];
    const fifthInterval = intervals[1];
    if (thirdInterval === 4 && fifthInterval === 8) return "augmented";
    if (thirdInterval === 4) return "major";
    if (thirdInterval === 3 && fifthInterval === 6) return "diminished";
    if (thirdInterval === 3) return "minor";
  }
  return "major";
}

export function getDiatonicTriads(scaleNotes: NoteType[]): Triad[] {
  if (scaleNotes.length !== 7) return [];

  const triads: Triad[] = [];
  const len = scaleNotes.length;

  for (let i = 0; i < len; i++) {
    const root = scaleNotes[i];
    const third = scaleNotes[(i + 2) % len];
    const fifth = scaleNotes[(i + 4) % len];

    const intervals = [
      getNoteIndex(third) - getNoteIndex(root),
      getNoteIndex(fifth) - getNoteIndex(root),
    ];

    const normalizedIntervals = intervals.map((iv) => (iv + 12) % 12);
    const quality = qualityFromIntervals(root, normalizedIntervals);

    const symbol =
      quality === "major"
        ? `${root}`
        : quality === "minor"
          ? `${root}m`
          : quality === "diminished"
            ? `${root}dim`
            : `${root}aug`;

    triads.push({
      root,
      quality,
      intervals: normalizedIntervals,
      symbol,
    });
  }

  return triads;
}

export function getChordTones(triad: Triad): NoteType[] {
  return [triad.root, getNoteAtInterval(triad.root, triad.intervals[0]), getNoteAtInterval(triad.root, triad.intervals[1])];
}

export function getToneOccurrences(tone: NoteType, triads: Triad[]): number {
  return triads.filter((t) => getChordTones(t).includes(tone)).length;
}

export function isToneShared(tone: NoteType, triads: Triad[]): boolean {
  return triads.length > 0 && getToneOccurrences(tone, triads) > 1;
}

export function getTriadDisplayLabel(triad: Triad, showFlats: boolean): string {
  const root = showFlats ? (SHARP_TO_FLAT[triad.root] ?? triad.root) : triad.root;
  return `${root}${triad.quality === "major" ? "" : triad.quality === "minor" ? "m" : triad.quality === "diminished" ? "dim" : "aug"}`;
}
