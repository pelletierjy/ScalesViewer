import { Note } from "@/lib/utils/note";
import { getInterval, transposeNote } from "@/lib/utils/scaleUtils";
import { TuningPreset } from "../types/tuningPreset";

// Adjust the scaleRoot based on the selected baseTuning.
// It computes the interval between a standard base ("E") and the selected baseTuning.
// Then it transposes each string by that interval.
export const getAdjustedTuning = (
  originalTuning: TuningPreset,
  baseNote: Note
): TuningPreset => {
  const standardBase = "E";
  const interval = getInterval(standardBase, baseNote);
  return {
    ...originalTuning,
    strings: originalTuning.strings.map((note) =>
      transposeNote(note, interval)
    ),
  };
};
