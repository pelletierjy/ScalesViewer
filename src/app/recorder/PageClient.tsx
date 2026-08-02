"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectIsDarkMode,
  selectScale,
  selectShowFlats,
  selectIsMonochrome,
  selectShowDegrees,
} from "@/features/globalConfig/globalConfigSlice";
import { Note } from "@/lib/utils/note";
import { usePlayNote } from "@/lib/hooks/usePlayNote";
import { getRecorderScaleNotes } from "@/lib/utils/recorderUtils";
import {
  RECORDER_TYPES,
  DEFAULT_RECORDER_TYPE_ID,
  getRecorderType,
} from "./recorderFingerings";
import { RecorderDiagram } from "./RecorderDiagram";
import ChordPanel from "@/components/ChordPanel/ChordPanel";
import PatternPanel from "@/components/PatternPanel/PatternPanel";
import { useChordHighlight } from "@/lib/hooks/useChordHighlight";
import { usePatternHighlight } from "@/lib/hooks/usePatternHighlight";
import { Field, Select, Stage } from "@/components/ui";

const NOTE_COUNT_OPTIONS = [1, 3, 5, 7, 12, 16];
const DIAGRAM_WIDTH = 80;
const GAP = 20;
const PADDING = 20;

const getNoteCount = (): number => {
  const saved = localStorage.getItem("recorder-note-count");
  if (saved) {
    const count = parseInt(saved, 10);
    if (!isNaN(count) && NOTE_COUNT_OPTIONS.includes(count)) {
      return count;
    }
  }
  return 7;
};

const getSavedRecorderTypeId = (): string => {
  const saved = localStorage.getItem("recorder-type");
  if (saved && RECORDER_TYPES.some((t) => t.id === saved)) {
    return saved;
  }
  return DEFAULT_RECORDER_TYPE_ID;
};

export default function Recorder() {
  const scale = useSelector(selectScale);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showFlats = useSelector(selectShowFlats);
  const showDegrees = useSelector(selectShowDegrees);
  const highlightRoots = useSelector(selectIsMonochrome);
  const playNoteSound = usePlayNote();
  const { getChordNoteColor, chordScaleMode, selectedChord } = useChordHighlight(scale);
  const { getPatternNoteColor, isPatternModeEnabled } = usePatternHighlight(scale);

  const getFinalNoteColor = (noteName: Note, fallback: string): string => {
    if (isPatternModeEnabled) {
      const patternColor = getPatternNoteColor(noteName, fallback);
      if (patternColor !== fallback) return patternColor;
    }
    if (chordScaleMode && selectedChord) {
      return getChordNoteColor(noteName, fallback);
    }
    return fallback;
  };

  const [noteCount, setNoteCount] = useState<number>(getNoteCount);
  const [recorderTypeId, setRecorderTypeId] = useState<string>(getSavedRecorderTypeId);

  useEffect(() => {
    localStorage.setItem("recorder-note-count", noteCount.toString());
  }, [noteCount]);

  useEffect(() => {
    localStorage.setItem("recorder-type", recorderTypeId);
  }, [recorderTypeId]);

  const recorder = useMemo(() => getRecorderType(recorderTypeId), [recorderTypeId]);

  const notes = useMemo(() => {
    return getRecorderScaleNotes(scale, noteCount, recorder);
  }, [scale, noteCount, recorder]);

  const displayMode = showDegrees ? "degree" : showFlats ? "flat" : "note";

  const totalWidth = notes.length * DIAGRAM_WIDTH + (notes.length - 1) * GAP + PADDING * 2;
  const viewBox = `0 0 ${totalWidth} 400`;

  return (
    <div className="w-full flex flex-col gap-3">
      <Stage>
        <svg width="100%" height="400" viewBox={viewBox}>
          {notes.map((note, i) => (
            <g
              key={`${note}-${i}`}
              transform={`translate(${PADDING + i * (DIAGRAM_WIDTH + GAP) + DIAGRAM_WIDTH / 2}, 20)`}
            >
              <RecorderDiagram
                note={note}
                recorder={recorder}
                scale={scale}
                displayMode={displayMode}
                isDarkMode={isDarkMode}
                highlightRoots={highlightRoots}
                onPlay={playNoteSound}
                getHighlightColor={getFinalNoteColor}
              />
            </g>
          ))}
        </svg>
      </Stage>

      <div className="flex flex-wrap justify-end gap-6">
        <Field label="Recorder" htmlFor="recorder-type">
          <Select
            id="recorder-type"
            aria-label="Select recorder type"
            value={recorderTypeId}
            onChange={(e) => setRecorderTypeId(e.target.value)}
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

        <Field label="Display" htmlFor="note-count">
          <Select
            id="note-count"
            aria-label="Select number of notes to display"
            value={noteCount}
            onChange={(e) => setNoteCount(Number(e.target.value))}
          >
            {NOTE_COUNT_OPTIONS.map((num) => (
              <option key={num} value={num}>
                {num} note{num > 1 ? "s" : ""}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <ChordPanel scale={scale} />
      <PatternPanel scale={scale} />
    </div>
  );
}
