"use client";
import React, { useMemo } from "react";
import { getConsecutiveScaleNotes } from "@/lib/utils/fluteUtils";
import { useLocalStorageNumber } from "@/lib/hooks/useLocalStorage";
import { InstrumentViewProps } from "@/components/InstrumentWorkspace/types";
import { DiagramStrip } from "@/instruments/shared/DiagramStrip";
import { NoteCountControl } from "@/instruments/shared/NoteCountControl";
import { FluteDiagram } from "./FluteDiagram";

export interface FluteSettings {
  noteCount: number;
  setNoteCount: (value: number) => void;
}

export const useFluteSettings = (): FluteSettings => {
  const [noteCount, setNoteCount] = useLocalStorageNumber("flute-note-count", 7);
  return { noteCount, setNoteCount };
};

export const FluteControls: React.FC<{ settings: FluteSettings }> = ({ settings }) => (
  <NoteCountControl value={settings.noteCount} onChange={settings.setNoteCount} />
);

export const FluteView: React.FC<InstrumentViewProps<FluteSettings>> = ({
  scale,
  settings,
  displayMode,
  isDarkMode,
  highlightRoots,
  getHighlightColor,
  onPlay,
}) => {
  const notes = useMemo(
    () => getConsecutiveScaleNotes(scale, settings.noteCount, 4),
    [scale, settings.noteCount]
  );

  return (
    <DiagramStrip notes={notes}>
      {(note) => (
        <FluteDiagram
          note={note}
          scale={scale}
          displayMode={displayMode}
          isDarkMode={isDarkMode}
          highlightRoots={highlightRoots}
          onPlay={onPlay}
          getHighlightColor={getHighlightColor}
        />
      )}
    </DiagramStrip>
  );
};
