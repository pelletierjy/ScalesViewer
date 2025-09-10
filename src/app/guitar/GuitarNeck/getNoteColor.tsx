import { Note } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { getScaleNoteColor } from "./getScaleNoteColor";

export const getNoteColor = (
  note: Note,
  scale: Scale,
  isDarkMode: boolean,
  highlightRoots: boolean
): string => {
  const isRoot = note === scale.root;
  if (highlightRoots) {
    if (isRoot) {
      return isDarkMode ? "#4ade80" : "#16a34a"; // Green-500/600 for root notes - darker green for light mode
    }
    return isDarkMode ? "#60a5fa" : "#2563eb"; // Blue-400/500 for scale notes - darker blue for light mode
  }

  return highlightRoots
    ? isDarkMode
      ? isRoot
        ? "#f3f4f6"
        : "#4b5563"
      : isRoot
      ? "#1f2937"  // Dark gray for root in light mode
      : "#6b7280"  // Medium gray for scale notes in light mode
    : getScaleNoteColor(note, scale, isDarkMode, highlightRoots);
};
