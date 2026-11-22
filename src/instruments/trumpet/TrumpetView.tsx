"use client";
import React, { useMemo } from "react";
import { getTrumpetScaleNotes } from "@/lib/utils/trumpetUtils";
import {
  useLocalStorageNumber,
  useLocalStorageString,
} from "@/lib/hooks/useLocalStorage";
import { Field, Select } from "@/components/ui";
import { InstrumentViewProps } from "@/components/InstrumentWorkspace/types";
import { DiagramStrip } from "@/instruments/shared/DiagramStrip";
import { NoteCountControl } from "@/instruments/shared/NoteCountControl";
import {
  TRUMPET_TYPES,
  DEFAULT_TRUMPET_TYPE_ID,
  getTrumpetType,
} from "./trumpetFingerings";
import { TrumpetDiagram } from "./TrumpetDiagram";
import { useTranslations } from "next-intl";

export interface TrumpetSettings {
  noteCount: number;
  setNoteCount: (value: number) => void;
  trumpetTypeId: string;
  setTrumpetTypeId: (value: string) => void;
}

const isKnownTrumpetType = (id: string) => TRUMPET_TYPES.some((t) => t.id === id);

export const useTrumpetSettings = (): TrumpetSettings => {
  const [noteCount, setNoteCount] = useLocalStorageNumber("trumpet-note-count", 7);
  const [trumpetTypeId, setTrumpetTypeId] = useLocalStorageString(
    "trumpet-type",
    DEFAULT_TRUMPET_TYPE_ID,
    isKnownTrumpetType
  );
  return { noteCount, setNoteCount, trumpetTypeId, setTrumpetTypeId };
};

export const TrumpetControls: React.FC<{ settings: TrumpetSettings }> = ({
  settings,
}) => {
  const t = useTranslations();
  return (
    <>
      <Field label={t("instrument.trumpet")} htmlFor="trumpet-type">
        <Select
          id="trumpet-type"
          aria-label={t("ui.selectTrumpetType")}
          value={settings.trumpetTypeId}
          onChange={(e) => settings.setTrumpetTypeId(e.target.value)}
        >
          {TRUMPET_TYPES.map((tt) => (
            <option key={tt.id} value={tt.id}>
              {t(tt.nameKey)}
            </option>
          ))}
        </Select>
      </Field>

      <NoteCountControl value={settings.noteCount} onChange={settings.setNoteCount} />
    </>
  );
};

export const TrumpetView: React.FC<InstrumentViewProps<TrumpetSettings>> = ({
  scale,
  settings,
  displayMode,
  isDarkMode,
  highlightRoots,
  getHighlightColor,
  onPlay,
}) => {
  const trumpet = useMemo(
    () => getTrumpetType(settings.trumpetTypeId),
    [settings.trumpetTypeId]
  );

  const notes = useMemo(
    () => getTrumpetScaleNotes(scale, settings.noteCount, trumpet),
    [scale, settings.noteCount, trumpet]
  );

  return (
    <DiagramStrip notes={notes}>
      {(note) => (
        <TrumpetDiagram
          note={note}
          trumpet={trumpet}
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
