"use client";
import React from "react";
import {
  isNoteInScale,
  getScaleDegree,
  SHARP_TO_FLAT,
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
import { selectAudioStatus } from "@/features/audio/audioSlice";
import { RootState } from "@/app/store";

// Standard 17-key kalimba scaleRoot (from center outward)
const KALIMBA_NOTES: Note[] = [
  "D", // Center tine
  "B",
  "G",
  "E",
  "C",
  "A",
  "F",
  "D", // Leftmost tine
  "F",
  "A",
  "C",
  "E",
  "G",
  "B",
  "D",
  "F",
  "A", // Rightmost tine
];

const sharpToFlat = (note: Note): Note => {
  return SHARP_TO_FLAT[note] || note;
};

export default function Kalimba() {
  const showFlats = useSelector(selectShowFlats);
  const scale = useSelector(selectScale);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showDegrees = useSelector(selectShowDegrees);
  const highlightRoots = useSelector(selectIsMonochrome);
  const audioStatus = useSelector((state: RootState) => selectAudioStatus(state));

  const getNoteColor = (note: Note, isRoot: boolean): string => {
    if (isRoot) {
      return isDarkMode ? "#f3f4f6" : "#000000";
    }
    if (highlightRoots) {
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

  const handleNoteClick = (note: Note, index: number): void => {
    // Kalimba typically spans octaves 4-6
    // Middle tine (index 8) is usually G5
    const baseOctave = 5; // for the middle G
    const octaveOffset = Math.floor((index - 8) / 7);
    const octave = baseOctave + octaveOffset;
    const noteWithOctave = `${note}${octave}` as NoteWithOctave;
    playNote(noteWithOctave, audioStatus);
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width="100%"
        height="400"
        viewBox="0 0 800 400"
        className={`border rounded-lg transition-colors duration-200 ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : "border-slate-400 bg-slate-300"
        }`}
      >
        {/* Kalimba body */}
        <path
          d="M200,350 L600,350 Q650,350 650,300 L650,150 Q650,100 600,100 L200,100 Q150,100 150,150 L150,300 Q150,350 200,350 Z"
          fill={isDarkMode ? "#4b5563" : "#d1d5db"}
          className="transition-colors duration-200"
        />

        {/* Sound hole */}
        <circle
          cx="400"
          cy="250"
          r="40"
          fill={isDarkMode ? "#1f2937" : "#ffffff"}
          className="transition-colors duration-200"
        />

        {/* Tines */}
        {KALIMBA_NOTES.map((note, i) => {
          const inScale = isNoteInScale(note, scale);
          const isRoot = note === scale.root;
          const centerIndex = Math.floor(KALIMBA_NOTES.length / 2);
          const offset = i - centerIndex;
          const x = 400 + offset * 30;
          const height = 180 - Math.abs(offset) * 8;

          return (
            <g key={i}>
              {/* Tine */}
              <rect
                x={x - 5}
                y={120}
                width={10}
                height={height}
                rx={5}
                fill={isDarkMode ? "#6b7280" : "#9ca3af"}
                className="transition-colors duration-200"
              />

              {/* Note indicator */}
              {inScale ? (
                <g
                  transform={`translate(${x}, ${120 + height + 20})`}
                  onClick={() => handleNoteClick(note, i)}
                  className="cursor-pointer"
                >
                  <circle
                    r={15}
                    fill={getNoteColor(note, isRoot)}
                    className="transition-colors duration-200 hover:fill-opacity-90"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={
                      isDarkMode ? "#1f2937" : isRoot ? "#ffffff" : "#1f2937"
                    }
                    fontSize="12"
                    className="select-none font-bold transition-colors duration-200"
                  >
                    {showDegrees
                      ? getScaleDegree(note, scale)
                      : showFlats
                      ? sharpToFlat(note)
                      : note}
                  </text>
                </g>
              ) : (
                <g
                  transform={`translate(${x}, ${120 + height + 20})`}
                  onClick={() => handleNoteClick(note, i)}
                  className="cursor-pointer"
                >
                  <circle
                    r={15}
                    fill={isDarkMode ? "#374151" : "#e5e7eb"} // Gray-700/200 for non-scale notes
                    className="transition-colors duration-200 hover:fill-opacity-90"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isDarkMode ? "#9ca3af" : "#6b7280"}
                    fontSize="12"
                    className="select-none font-bold transition-colors duration-200"
                  >
                    {showFlats ? sharpToFlat(note) : note}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}