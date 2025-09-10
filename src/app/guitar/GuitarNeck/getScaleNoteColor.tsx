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

  // Root note (1) is dark in light mode, slightly off-white in dark mode
  if (degree === "1") {
    return isDarkMode ? "#f3f4f6" : "#1f2937"; // slate-100/800
  }

  // If monochrome mode is enabled, use gray for all non-root notes
  if (highlightRoots) {
    return isDarkMode ? "#4b5563" : "#4b5563"; // gray-600 for both modes
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
      return isDarkMode ? "#059669" : "#065f46"; // emerald-600/800 - darker in light mode
    case "4":
      return isDarkMode ? "#34d399" : "#059669"; // emerald-400/600 - medium contrast
    case "6":
      return isDarkMode ? "#6ee7b7" : "#047857"; // emerald-300/700 - lighter in light mode

    // Odd numbers - Orange gradient from dark to light
    case "3":
      return isDarkMode ? "#ea580c" : "#9a3412"; // orange-600/800 - darker in light mode
    case "5":
      return isDarkMode ? "#f97316" : "#ea580c"; // orange-500/600 - medium contrast
    case "7":
      return isDarkMode ? "#fb923c" : "#f97316"; // orange-400/500 - lighter in light mode

    // Defaults
    default:
      return isDarkMode ? "#9ca3af" : "#4b5563"; // gray-400/600 - better contrast in light mode
  }
};
