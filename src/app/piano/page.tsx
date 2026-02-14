"use client";
import React, { useEffect, useState } from "react";
import {
  isNoteInScale,
  getScaleDegree,
  SHARP_TO_FLAT,
} from "@/lib/utils/scaleUtils";
import { playNote } from "@/lib/utils/audioUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsDarkMode,
  selectScale,
  selectShowFlats,
  selectIsMonochrome,
  selectShowDegrees,
} from "../../features/globalConfig/globalConfigSlice";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { selectAudioStatus } from "@/features/audio/audioSlice";
import { selectNote } from "@/features/selectedNote/selectedNoteSlice";
import { RootState } from "@/app/store";

// Define piano keys for one octave
const OCTAVE_NOTES: { note: Note; isBlack: boolean }[] = [
  { note: "C", isBlack: false },
  { note: "C#", isBlack: true },
  { note: "D", isBlack: false },
  { note: "D#", isBlack: true },
  { note: "E", isBlack: false },
  { note: "F", isBlack: false },
  { note: "F#", isBlack: true },
  { note: "G", isBlack: false },
  { note: "G#", isBlack: true },
  { note: "A", isBlack: false },
  { note: "A#", isBlack: true },
  { note: "B", isBlack: false },
];

const sharpToFlat = (note: Note): Note => {
  return SHARP_TO_FLAT[note] || note;
};

const getNoteColor = (
  note: Note,
  scale: Scale,
  isDarkMode: boolean,
  highlightRoots: boolean
): string => {
  const isRoot = note === scale.root;
  const degree = getScaleDegree(note, scale);

  if (highlightRoots) {
    if (isRoot) {
      return isDarkMode ? "#4ade80" : "#22c55e"; // Green-500/600 for root notes
    }
    return isDarkMode ? "#60a5fa" : "#3b82f6"; // Blue-400/500 for scale notes
  }

  // Root note (1) is black in light mode, slightly off-white in dark mode
  if (isRoot) {
    return isDarkMode ? "#f3f4f6" : "#000000";
  }

  // Map intervals based on scale context
  const normalizedDegree = (() => {
    // Basic flat mappings
    if (["♭2", "♭3", "♭5", "♭6", "♭7"].includes(degree)) {
      return degree.replace("♭", "");
    }
    // Default to original degree
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
    // Defaults
    default:
      return isDarkMode ? "#9ca3af" : "#6b7280"; // gray-400/500
  }
};

export default function Piano() {
  const dispatch = useDispatch();
  const selectedNote = useSelector((state: RootState) => state.selectedNote.selectedNote);

  const getOctaveCount = (): number => {
    let _oct = 3;
    const savedOctaveCount = localStorage.getItem("octave-count");
    if (savedOctaveCount) {
      const count = parseInt(savedOctaveCount, 10);
      if (!isNaN(count) && count >= 1 && count <= 4) {
        _oct = count;
      }
    }
    return _oct;
  };

  const [octaveCount, setOctaveCount] = useState(getOctaveCount());
  const showFlats = useSelector(selectShowFlats);
  const scale = useSelector(selectScale);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showDegrees = useSelector(selectShowDegrees);
  const highlightRoots = useSelector(selectIsMonochrome);
  const audioStatus = useSelector(selectAudioStatus);
  const whiteKeyWidth = 40;
  const blackKeyWidth = 24;
  const whiteKeyHeight = 150;
  const blackKeyHeight = 90;

  // Generate piano notes for the specified number of octaves
  const PIANO_NOTES = Array.from({ length: octaveCount }).flatMap(
    () => OCTAVE_NOTES
  );

  useEffect(() => {
    localStorage.setItem("octave-count", octaveCount.toString());
  }, [octaveCount]);

  const handleNoteClick = (note: Note, octave: number): void => {
    const noteWithOctave = `${note}${octave}` as NoteWithOctave;
    playNote(noteWithOctave, audioStatus);
    if (selectedNote === note) {
      dispatch(selectNote(null));
    } else {
      dispatch(selectNote(note));
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="w-full overflow-x-auto">
        <svg
          width="100%"
          height="200"
          viewBox={`0 0 ${
            whiteKeyWidth * PIANO_NOTES.filter((k) => !k.isBlack).length
          } 200`}
          className={`border rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-slate-400 bg-slate-300"
          }`}
        >
          <g transform="translate(0, 25)">
            {/* White keys */}
            {PIANO_NOTES.filter((key) => !key.isBlack).map((key, i) => {
              const octave = Math.floor(i / 7) + 1;
              const inScale = isNoteInScale(key.note, scale);
              const isRoot = key.note === scale.root;

              return (
                <g
                  key={`white-${i}`}
                  onClick={() => inScale && handleNoteClick(key.note, octave)}
                  onKeyDown={(e) => {
                    if (inScale && (e.key === 'Enter' || e.key === ' ')) {
                      handleNoteClick(key.note, octave);
                    }
                  }}
                  role="button"
                  aria-label={inScale ? `${key.note}${octave}` : undefined}
                  tabIndex={inScale ? 0 : -1}
                  className={`transition-colors duration-200 ${
                    inScale
                      ? "hover:fill-opacity-90 cursor-pointer"
                      : "cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg`}
                >
                  <rect
                    x={i * whiteKeyWidth}
                    y={0}
                    width={whiteKeyWidth}
                    height={whiteKeyHeight}
                    fill={isDarkMode ? "#4b5563" : "#ffffff"}
                    stroke={isDarkMode ? "#1f2937" : "#000000"}
                    strokeWidth="1"
                  />
                  {inScale && (
                    <g>
                      <circle
                        cx={i * whiteKeyWidth + whiteKeyWidth / 2}
                        cy={whiteKeyHeight - 25}
                        r={selectedNote === key.note ? 22 : 15}
                        fill={getNoteColor(
                          key.note,
                          scale,
                          isDarkMode,
                          highlightRoots
                        )}
                        className="transition-all duration-200"
                        style={{
                          filter: selectedNote === key.note
                            ? `drop-shadow(0 0 10px rgba(255,255,255,1)) drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 3px rgba(255,255,255,0.7))`
                            : 'none',
                          stroke: selectedNote === key.note ? '#ffffff' : 'none',
                          strokeWidth: selectedNote === key.note ? 2.5 : 0
                        }}
                      />
                      <text
                        x={i * whiteKeyWidth + whiteKeyWidth / 2}
                        y={whiteKeyHeight - 25}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={
                          isDarkMode
                            ? "#1f2937"
                            : isRoot
                            ? "#ffffff"
                            : "#1f2937"
                        }
                        fontSize="12"
                        className="select-none font-bold transition-colors duration-200"
                      >
                        {showDegrees
                          ? getScaleDegree(key.note, scale)
                          : showFlats
                          ? sharpToFlat(key.note)
                          : key.note}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Black keys */}
            {PIANO_NOTES.filter((key) => key.isBlack).map((key, i) => {
              // Calculate the octave and position
              const octave = Math.floor(i / 5) + 1;
              const positionInOctave = i % 5;
              // Calculate position based on the white keys the black key sits between
              const whiteKeyOffset = Math.floor(i / 5) * 7; // Base offset for the octave
              const blackKeyPositions = [1, 2, 4, 5, 6]; // Position after each white key (0-based)
              const x =
                (whiteKeyOffset + blackKeyPositions[positionInOctave]) *
                  whiteKeyWidth -
                blackKeyWidth / 2;

              const inScale = isNoteInScale(key.note, scale);
              const isRoot = key.note === scale.root;

              return (
                <g
                  key={`black-${i}`}
                  onClick={() => inScale && handleNoteClick(key.note, octave)}
                  onKeyDown={(e) => {
                    if (inScale && (e.key === 'Enter' || e.key === ' ')) {
                      handleNoteClick(key.note, octave);
                    }
                  }}
                  role="button"
                  aria-label={inScale ? `${key.note}${octave}` : undefined}
                  tabIndex={inScale ? 0 : -1}
                  className={`transition-colors duration-200 ${
                    inScale
                      ? "hover:fill-opacity-90 cursor-pointer"
                      : "cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg`}
                >
                  <rect
                    x={x}
                    y={0}
                    width={blackKeyWidth}
                    height={blackKeyHeight}
                    fill={isDarkMode ? "#1f2937" : "#000000"}
                  />
                  {inScale && (
                    <g>
                      <circle
                        cx={x + blackKeyWidth / 2}
                        cy={blackKeyHeight - 25}
                        r={selectedNote === key.note ? 17 : 12}
                        fill={getNoteColor(
                          key.note,
                          scale,
                          isDarkMode,
                          highlightRoots
                        )}
                        className="transition-all duration-200"
                        style={{
                          filter: selectedNote === key.note
                            ? `drop-shadow(0 0 10px rgba(255,255,255,1)) drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 3px rgba(255,255,255,0.7))`
                            : 'none',
                          stroke: selectedNote === key.note ? '#ffffff' : 'none',
                          strokeWidth: selectedNote === key.note ? 2.5 : 0
                        }}
                      />
                      <text
                        x={x + blackKeyWidth / 2}
                        y={blackKeyHeight - 25}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={
                          isDarkMode
                            ? "#1f2937"
                            : isRoot
                            ? "#ffffff"
                            : "#1f2937"
                        }
                        fontSize="10"
                        className="select-none font-bold transition-colors duration-200"
                      >
                        {showDegrees
                          ? getScaleDegree(key.note, scale)
                          : showFlats
                          ? sharpToFlat(key.note)
                          : key.note}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {setOctaveCount && (
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="octave-count"
              className={`text-sm font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Display
            </label>
            <select
              id="octave-count"
              aria-label="Select number of octaves to display"
              value={octaveCount}
              onChange={(e) => setOctaveCount(Number(e.target.value))}
              className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-slate-300 border-slate-500 text-slate-800"
              }`}
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} octave{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}