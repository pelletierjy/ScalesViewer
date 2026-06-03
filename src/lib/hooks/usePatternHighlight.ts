"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectIsPatternModeEnabled,
  selectSelectedPatternId,
  selectCurrentStepIndex,
  selectIsPlaying,
} from "@/features/pattern/patternSlice";
import { PRESET_PATTERNS, getScaleNoteByDegree } from "@/lib/utils/patternUtils";
import { Scale } from "@/lib/utils/scaleType";
import { Note } from "@/lib/utils/note";
import { getNoteIndex } from "@/lib/utils/scaleUtils";

export function usePatternHighlight(scale: Scale) {
  const isPatternModeEnabled = useSelector(selectIsPatternModeEnabled);
  const selectedPatternId = useSelector(selectSelectedPatternId);
  const currentStepIndex = useSelector(selectCurrentStepIndex);
  const isPlaying = useSelector(selectIsPlaying);

  const currentPattern = useMemo(
    () => PRESET_PATTERNS.find((p) => p.id === selectedPatternId),
    [selectedPatternId]
  );

  const currentDegreeNote = useMemo<Note | null>(() => {
    if (!currentPattern || !isPlaying) return null;
    const step = currentPattern.steps[currentStepIndex];
    if (step === undefined) return null;
    return getScaleNoteByDegree(scale, step);
  }, [currentPattern, currentStepIndex, isPlaying, scale]);

  const getPatternNoteColor = (note: Note, fallback: string): string => {
    if (!isPatternModeEnabled || !currentDegreeNote) return fallback;
    if (getNoteIndex(note) === getNoteIndex(currentDegreeNote)) {
      return "#ffffff";
    }
    return fallback;
  };

  const isPatternNote = (note: Note): boolean => {
    if (!isPatternModeEnabled || !currentDegreeNote) return false;
    return getNoteIndex(note) === getNoteIndex(currentDegreeNote);
  };

  return {
    getPatternNoteColor,
    isPatternNote,
    isPatternModeEnabled,
    isPlaying,
    currentStepIndex,
    currentPattern,
  };
}
