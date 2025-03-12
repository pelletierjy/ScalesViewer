import { Note } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { getScaleNoteColor } from "./getScaleNoteColor";

export const getNoteColor = (
  note: Note,
  scale: Scale,
  isDarkMode: boolean,
  isMonochrome: boolean
): string => {
  const isRoot = note === scale.root;
  if (isMonochrome) {
    if (isRoot) {
      return isDarkMode ? "#4ade80" : "#22c55e"; // Green-500/600 for root notes
    }
    return isDarkMode ? "#60a5fa" : "#3b82f6"; // Blue-400/500 for scale notes
  }

  return isMonochrome
    ? isDarkMode
      ? isRoot
        ? "#f3f4f6"
        : "#4b5563"
      : isRoot
      ? "#000000"
      : "#d1d5db"
    : getScaleNoteColor(note, scale, isDarkMode, isMonochrome);
};
