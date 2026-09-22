"use client";
import React, { useMemo } from "react";
import { getRecorderScaleNotes } from "@/lib/utils/recorderUtils";
import {
  useLocalStorageNumber,
  useLocalStorageString,
} from "@/lib/hooks/useLocalStorage";
import { Field, Select } from "@/components/ui";
import { InstrumentViewProps } from "@/components/InstrumentWorkspace/types";
import { DiagramStrip } from "@/instruments/shared/DiagramStrip";
import { NoteCountControl } from "@/instruments/shared/NoteCountControl";
import {
  RECORDER_TYPES,
  DEFAULT_RECORDER_TYPE_ID,
  getRecorderType,
} from "./recorderFingerings";
import { RecorderDiagram } from "./RecorderDiagram";

export interface RecorderSettings {
  noteCount: number;
  setNoteCount: (value: number) => void;
  recorderTypeId: string;
  setRecorderTypeId: (value: string) => void;
}

const isKnownRecorderType = (id: string) => RECORDER_TYPES.some((t) => t.id === id);

export const useRecorderSettings = (): RecorderSettings => {
  const [noteCount, setNoteCount] = useLocalStorageNumber("recorder-note-count", 7);
  const [recorderTypeId, setRecorderTypeId] = useLocalStorageString(
    "recorder-type",
    DEFAULT_RECORDER_TYPE_ID,
    isKnownRecorderType
  );
  return { noteCount, setNoteCount, recorderTypeId, setRecorderTypeId };
};

export const RecorderControls: React.FC<{ settings: RecorderSettings }> = ({
  settings,
}) => (
  <>
    <Field label="Recorder" htmlFor="recorder-type">
      <Select
        id="recorder-type"
        aria-label="Select recorder type"
        value={settings.recorderTypeId}
        onChange={(e) => settings.setRecorderTypeId(e.target.value)}
      >
        <optgroup label="In C (en Do)">
          {RECORDER_TYPES.filter((t) => t.key === "C").map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="In F (en Fa)">
          {RECORDER_TYPES.filter((t) => t.key === "F").map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </optgroup>
      </Select>
    </Field>

    <NoteCountControl value={settings.noteCount} onChange={settings.setNoteCount} />
  </>
);

export const RecorderView: React.FC<InstrumentViewProps<RecorderSettings>> = ({
  scale,
  settings,
  displayMode,
  isDarkMode,
  highlightRoots,
  getHighlightColor,
  onPlay,
}) => {
  const recorder = useMemo(
    () => getRecorderType(settings.recorderTypeId),
    [settings.recorderTypeId]
  );

  const notes = useMemo(
    () => getRecorderScaleNotes(scale, settings.noteCount, recorder),
    [scale, settings.noteCount, recorder]
  );

  return (
    <DiagramStrip notes={notes}>
      {(note) => (
        <RecorderDiagram
          note={note}
          recorder={recorder}
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
