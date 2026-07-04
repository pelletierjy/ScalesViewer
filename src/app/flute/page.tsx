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
import { NoteWithOctave } from "@/lib/utils/note";
import { usePlayNote } from "@/lib/hooks/usePlayNote";
import { getConsecutiveScaleNotes } from "@/lib/utils/fluteUtils";
import { FluteDiagram } from "./FluteDiagram";

const NOTE_COUNT_OPTIONS = [1, 3, 5, 7, 12, 24];
const DIAGRAM_WIDTH = 340;
const GAP = 16;
const PADDING = 24;

const getNoteCount = (): number => {
  const saved = localStorage.getItem("flute-note-count");
  if (saved) {
    const count = parseInt(saved, 10);
    if (!isNaN(count) && NOTE_COUNT_OPTIONS.includes(count)) {
      return count;
    }
  }
  return 7;
};

export default function Flute() {
  const scale = useSelector(selectScale);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showFlats = useSelector(selectShowFlats);
  const showDegrees = useSelector(selectShowDegrees);
  const highlightRoots = useSelector(selectIsMonochrome);
  const playNoteSound = usePlayNote();

  const [noteCount, setNoteCount] = useState<number>(getNoteCount);

  useEffect(() => {
    localStorage.setItem("flute-note-count", noteCount.toString());
  }, [noteCount]);

  const notes = useMemo(() => {
    return getConsecutiveScaleNotes(scale, noteCount, 4);
  }, [scale, noteCount]);

  const displayMode = showDegrees ? "degree" : showFlats ? "flat" : "note";

  const totalWidth = notes.length * DIAGRAM_WIDTH + (notes.length - 1) * GAP + PADDING * 2;
  const viewBox = `0 0 ${totalWidth} 140`;

  return (
    <div className="w-full space-y-6">
      <div className="w-full overflow-x-auto">
        <svg
          width="100%"
          height="140"
          viewBox={viewBox}
          className={`border rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-slate-400 bg-slate-300"
          }`}
        >
          {notes.map((note, i) => (
            <g
              key={`${note}-${i}`}
              transform={`translate(${PADDING + i * (DIAGRAM_WIDTH + GAP)}, 12)`}
            >
              <FluteDiagram
                note={note}
                scale={scale}
                displayMode={displayMode}
                isDarkMode={isDarkMode}
                highlightRoots={highlightRoots}
                onPlay={playNoteSound}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="note-count"
            className={`text-sm font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Display
          </label>
          <select
            id="note-count"
            aria-label="Select number of notes to display"
            value={noteCount}
            onChange={(e) => setNoteCount(Number(e.target.value))}
            className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-200"
                : "bg-slate-300 border-slate-500 text-slate-800"
            }`}
          >
            {NOTE_COUNT_OPTIONS.map((num) => (
              <option key={num} value={num}>
                {num} note{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
