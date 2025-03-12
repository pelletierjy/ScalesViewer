"use client";
import React, { useState } from "react";
import {
  isNoteInScale,
  getScaleDegree,
  SHARP_TO_FLAT,
  transposeNote,
  getInterval,
} from "@/lib/utils/scaleUtils";
import { playNote } from "@/lib/utils/audioUtils";
import { useSelector } from "react-redux";
import {
  selectIsDarkMode,
  selectScale,
  selectShowFlats,
  selectIsMonochrome,
  selectShowDegrees,
} from "../../features/globalConfig/globalConfigSlice";
import { Note, NoteWithOctave } from "@/lib/utils/note";

// Common harmonica keys
const HARMONICA_KEYS: Note[] = ["C", "G", "A", "D", "F", "Bb", "Eb"];

// Standard 10-hole diatonic harmonica layout in C
const BASE_HARMONICA_NOTES = {
  blow: ["C", "E", "G", "C", "E", "G", "C", "E", "G", "C"] as Note[],
  draw: ["D", "G", "B", "D", "F", "A", "B", "D", "F", "A"] as Note[],
};

const sharpToFlat = (note: Note): Note => {
  return SHARP_TO_FLAT[note] || note;
};

// Function to transpose harmonica notes based on selected key
const transposeHarmonicaNotes = (key: Note) => {
  if (key === "C") return BASE_HARMONICA_NOTES;

  const interval = getInterval("C", key);
  return {
    blow: BASE_HARMONICA_NOTES.blow.map((note) =>
      transposeNote(note, interval)
    ) as Note[],
    draw: BASE_HARMONICA_NOTES.draw.map((note) =>
      transposeNote(note, interval)
    ) as Note[],
  };
};

export default function Harmonica() {
  const showFlats = useSelector(selectShowFlats);
  const scale = useSelector(selectScale);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showDegrees = useSelector(selectShowDegrees);
  const isMonochrome = useSelector(selectIsMonochrome);
  const [selectedKey, setSelectedKey] = useState<Note>("C");
  const harmonicaNotes = transposeHarmonicaNotes(selectedKey);

  const getNoteColor = (note: Note, isRoot: boolean): string => {
    if (isRoot) {
      return isDarkMode ? "#f3f4f6" : "#000000";
    }
    if (isMonochrome) {
      return isDarkMode ? "#60a5fa" : "#3b82f6"; // Blue-400/500 for scale notes
    }

    const degree = getScaleDegree(note, scale);
    const normalizedDegree = (() => {
      if (["♭2", "♭3", "♭5", "♭6", "♭7"].includes(degree)) {
        return degree.replace("♭", "");
      }
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
      default:
        return isDarkMode ? "#9ca3af" : "#6b7280";
    }
  };

  const handleNoteClick = (note: Note, holeNumber: number) => {
    // Calculate octave based on hole number
    // Harmonica typically spans 3 octaves
    // For a C harmonica:
    // Blow: Low C4 to High C6
    // Draw: D4 to A6
    const baseOctave = 4;
    const octaveOffset = Math.floor((holeNumber - 1) / 3);
    const octave = baseOctave + octaveOffset;
    const noteWithOctave = `${note}${octave}` as NoteWithOctave;
    playNote(noteWithOctave);
  };

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <svg
          width="100%"
          height="400"
          viewBox="0 0 1200 400"
          className={`border rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          {/* Harmonica body - wider and taller */}
          <rect
            x="100"
            y="100"
            width="1000"
            height="200"
            rx="20"
            fill={isDarkMode ? "#4b5563" : "#d1d5db"}
            className="transition-colors duration-200"
          />

          {/* Holes and notes - adjusted spacing */}
          {harmonicaNotes.blow.map((note, i) => {
            const x = 180 + i * 90; // Increased spacing between holes
            const blowNote = note;
            const drawNote = harmonicaNotes.draw[i];
            const blowInScale = isNoteInScale(blowNote, scale);
            const drawInScale = isNoteInScale(drawNote, scale);
            const isBlowRoot = blowNote === scale.root;
            const isDrawRoot = drawNote === scale.root;

            return (
              <g key={i}>
                {/* Hole - larger */}
                <rect
                  x={x - 15}
                  y="170"
                  width="30"
                  height="60"
                  rx="4"
                  fill={isDarkMode ? "#1f2937" : "#000000"}
                  className="transition-colors duration-200"
                />

                {/* Blow note (top) - larger and more spaced */}
                {blowInScale && (
                  <g
                    onClick={() => handleNoteClick(blowNote, i + 1)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x}
                      cy="130"
                      r="22"
                      fill={getNoteColor(blowNote, isBlowRoot)}
                      className="transition-colors duration-200 hover:fill-opacity-90"
                    />
                    <text
                      x={x}
                      y="130"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={
                        isDarkMode
                          ? "#1f2937"
                          : isBlowRoot
                          ? "#ffffff"
                          : "#1f2937"
                      }
                      fontSize="16"
                      className="select-none font-bold transition-colors duration-200"
                    >
                      {showDegrees
                        ? getScaleDegree(blowNote, scale)
                        : showFlats
                        ? sharpToFlat(blowNote)
                        : blowNote}
                    </text>
                    <text
                      x={x + 26}
                      y="130"
                      textAnchor="start"
                      dominantBaseline="middle"
                      fill={isDarkMode ? "#9ca3af" : "#4b5563"}
                      fontSize="14"
                      className="select-none transition-colors duration-200"
                    >
                      ↑
                    </text>
                  </g>
                )}

                {/* Draw note (bottom) - larger and more spaced */}
                {drawInScale && (
                  <g
                    onClick={() => handleNoteClick(drawNote, i + 1)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x}
                      cy="270"
                      r="22"
                      fill={getNoteColor(drawNote, isDrawRoot)}
                      className="transition-colors duration-200 hover:fill-opacity-90"
                    />
                    <text
                      x={x}
                      y="270"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={
                        isDarkMode
                          ? "#1f2937"
                          : isDrawRoot
                          ? "#ffffff"
                          : "#1f2937"
                      }
                      fontSize="16"
                      className="select-none font-bold transition-colors duration-200"
                    >
                      {showDegrees
                        ? getScaleDegree(drawNote, scale)
                        : showFlats
                        ? sharpToFlat(drawNote)
                        : drawNote}
                    </text>
                    <text
                      x={x + 26}
                      y="270"
                      textAnchor="start"
                      dominantBaseline="middle"
                      fill={isDarkMode ? "#9ca3af" : "#4b5563"}
                      fontSize="14"
                      className="select-none transition-colors duration-200"
                    >
                      ↓
                    </text>
                  </g>
                )}

                {/* Hole number - larger */}
                <text
                  x={x}
                  y="200"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isDarkMode ? "#9ca3af" : "#4b5563"}
                  fontSize="14"
                  className="select-none transition-colors duration-200"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex justify-end mt-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor="harmonicaKey"
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Harmonica Key:
          </label>
          <select
            id="harmonicaKey"
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value as Note)}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {HARMONICA_KEYS.map((key) => (
              <option key={key} value={key}>
                {showFlats ? sharpToFlat(key) : key}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
