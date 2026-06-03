"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { isToneShared, getChordTones, getDiatonicTriads, Triad } from "@/lib/utils/chordUtils";
import { getScaleNotes, getNoteIndex } from "@/lib/utils/scaleUtils";
import { Scale } from "@/lib/utils/scaleType";
import { Note } from "@/lib/utils/note";

export type ChordToneType = "root" | "shared" | "unique" | "none";

export function useChordHighlight(scale: Scale) {
  const isDark = useSelector((state: RootState) => state.globalConfig.isDarkMode);
  const chordScaleMode = useSelector((state: RootState) => state.globalConfig.chordScaleMode);
  const selectedChord = useSelector((state: RootState) => state.globalConfig.selectedChord);

  const selectedTriad = useMemo<Triad | null>(() => {
    if (!chordScaleMode || !selectedChord) return null;
    const scaleNotes = getScaleNotes(scale);
    const triads = getDiatonicTriads(scaleNotes);
    return triads.find((t) => t.symbol === selectedChord) ?? null;
  }, [chordScaleMode, selectedChord, scale]);

  const getToneType = useMemo(() => {
    if (!selectedTriad) {
      return (_note: Note): ChordToneType => "none";
    }
    const toneTypes = new Map<number, ChordToneType>();
    const tones = getChordTones(selectedTriad);
    const allTriads = getDiatonicTriads(getScaleNotes(scale));
    tones.forEach((tone) => {
      const noteIndex = getNoteIndex(tone);
      if (tone === selectedTriad.root) toneTypes.set(noteIndex, "root");
      else if (isToneShared(tone, allTriads)) toneTypes.set(noteIndex, "shared");
      else toneTypes.set(noteIndex, "unique");
    });
    return (note: Note) => toneTypes.get(getNoteIndex(note)) ?? "none";
  }, [selectedTriad, scale]);

  const getChordNoteColor = (note: Note, fallback: string): string => {
    const type = getToneType(note);
    if (type === "none") return fallback;
    if (type === "root") return isDark ? "#4ade80" : "#15803d";
    if (type === "shared") return isDark ? "#facc15" : "#a16207";
    return isDark ? "#f87171" : "#b91c1c";
  };

  return {
    getToneType,
    getChordNoteColor,
    chordScaleMode,
    selectedChord,
    isDark,
  };
}
