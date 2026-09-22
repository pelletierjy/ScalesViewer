import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  selectIsDarkMode,
  selectIsMonochrome,
} from "@/features/globalConfig/globalConfigSlice";
import { useChordHighlight } from "@/lib/hooks/useChordHighlight";
import { usePatternHighlight } from "@/lib/hooks/usePatternHighlight";
import { getNoteColor as getPaletteColor } from "@/lib/utils/noteColors";
import { Note } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";

export interface NoteColors {
  isDarkMode: boolean;
  highlightRoots: boolean;
  /** True when a chord or pattern overlay is currently active. */
  hasHighlights: boolean;
  /** Pattern highlight, then chord highlight, then the supplied fallback. */
  getHighlightColor: (note: Note, fallback: string) => string;
  /** The fully composed colour for a scale note. */
  getNoteColor: (note: Note) => string;
}

/**
 * The single note-colour resolver every instrument view uses. Composes the
 * degree palette with the pattern and chord highlight overlays.
 */
export function useNoteColors(scale: Scale): NoteColors {
  const isDarkMode = useSelector(selectIsDarkMode);
  const highlightRoots = useSelector(selectIsMonochrome);
  const { getChordNoteColor, chordScaleMode, selectedChord } = useChordHighlight(scale);
  const { getPatternNoteColor, isPatternModeEnabled } = usePatternHighlight(scale);

  const getHighlightColor = useCallback(
    (note: Note, fallback: string): string => {
      if (isPatternModeEnabled) {
        const patternColor = getPatternNoteColor(note, fallback);
        if (patternColor !== fallback) return patternColor;
      }
      if (chordScaleMode && selectedChord) {
        return getChordNoteColor(note, fallback);
      }
      return fallback;
    },
    [
      isPatternModeEnabled,
      getPatternNoteColor,
      chordScaleMode,
      selectedChord,
      getChordNoteColor,
    ]
  );

  const getNoteColor = useCallback(
    (note: Note): string =>
      getHighlightColor(
        note,
        getPaletteColor(note, scale, isDarkMode, highlightRoots)
      ),
    [getHighlightColor, scale, isDarkMode, highlightRoots]
  );

  const hasHighlights = isPatternModeEnabled || Boolean(chordScaleMode && selectedChord);

  return {
    isDarkMode,
    highlightRoots,
    hasHighlights,
    getHighlightColor,
    getNoteColor,
  };
}
