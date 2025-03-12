import { Note } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { getScaleDegree } from "@/lib/utils/scaleUtils";

export const getScaleNoteColor = (
  note: Note,
  scale: Scale,
  isDarkMode: boolean,
  highlightRoots: boolean
): string => {
  const degree = getScaleDegree(note, scale);

  // Root note (1) is black in light mode, slightly off-white in dark mode
  if (degree === "1") {
    return isDarkMode ? "#f3f4f6" : "#000000";
  }

  // If monochrome mode is enabled, use gray for all non-root notes
  if (highlightRoots) {
    return isDarkMode ? "#4b5563" : "#374151";
  }

  // Map intervals based on scale context
  const normalizedDegree = (() => {
    // Basic flat mappings
    if (["♭2", "♭3", "♭5", "♭6", "♭7"].includes(degree)) {
      return degree.replace("♭", "");
    }
    // Default to original degree
    return degree;
  })();

  // Color mapping
  switch (normalizedDegree) {
    // Even numbers - Green gradient from dark to light
    case "2":
      return isDarkMode ? "#059669" : "#047857"; // emerald-600/700 - darker
    case "4":
      return isDarkMode ? "#34d399" : "#10b981"; // emerald-400/500 - medium
    case "6":
      return isDarkMode ? "#6ee7b7" : "#34d399"; // emerald-300/400 - lighter

    // Odd numbers - Orange gradient from dark to light
    case "3":
      return isDarkMode ? "#ea580c" : "#c2410c"; // orange-600/700 - darker
    case "5":
      return isDarkMode ? "#f97316" : "#ea580c"; // orange-500/600 - medium
    case "7":
      return isDarkMode ? "#fb923c" : "#f97316"; // orange-400/500 - lighter

    // Defaults
    default:
      return isDarkMode ? "#9ca3af" : "#6b7280"; // gray-400/500
  }
};
