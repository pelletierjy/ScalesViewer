import React, { useContext, useEffect, useRef, useState } from "react";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import {
  calculateFretNote,
  isNoteInScale,
  getScaleDegree,
  sharpToFlat,
} from "@/lib/utils/scaleUtils";
import { playNote } from "@/lib/utils/audioUtils";
import { TuningPreset } from "../types/tuningPreset";
import { useSelector } from "react-redux";
import {
  selectIsDarkMode,
  selectIsMonochrome,
  selectScale,
  selectShowDegrees,
  selectShowFlats,
} from "@/features/globalConfig/globalConfigSlice";
import { DataContext, DataContextType } from "../context";
import { getNoteColor } from "./getNoteColor";
import { getFretPositions } from "./getFretPositions";
import { getStringThickness } from "./getStringThickness";
import { getAdjustedTuning } from "./getAdjustedTuning";

export const GuitarNeck: React.FC<{ scaleRoot: TuningPreset }> = ({
  scaleRoot,
}) => {
  const {
    fretCount = 12,
    flipX = false,
    flipY = false,
    baseTuning = "E",
  } = useContext(DataContext) as DataContextType;
  const showFlats = useSelector(selectShowFlats);
  const scale = useSelector(selectScale);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showDegrees = useSelector(selectShowDegrees);
  const highlightRoots = useSelector(selectIsMonochrome);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 200 });

  // Calculate container dimensions and adjust neck height based on string count.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const containerWidth = container.clientWidth;
      const baseHeight = Math.max(containerWidth * 0.2, 150);
      // Use a constant (6) as reference for string spacing and then scale by actual string count.
      const heightPerString = baseHeight / 6;
      const adjustedHeight = heightPerString * (scaleRoot.strings.length + 1);
      setDimensions({
        width: containerWidth,
        height: adjustedHeight,
      });
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [scaleRoot.strings.length]);

  const stringSpacing = dimensions.height / (scaleRoot.strings.length + 1);

  const adjustedTuning = getAdjustedTuning(scaleRoot, baseTuning);

  const calculateNoteWithOctave = (
    openNote: Note,
    stringIndex: number,
    fret: number
  ): NoteWithOctave => {
    // Standard guitar string octaves (from highest to lowest string)
    const getBaseOctave = (note: Note, index: number): number => {
      if (index === 0 && note === "E") return 4; // High E
      if (index === scaleRoot.strings.length - 1 && note === "E") return 2; // Low E

      switch (note) {
        case "E":
          return index === 0 ? 4 : 2; // Handle both high and low E
        case "B":
          return 3;
        case "G":
          return 3;
        case "D":
          return 3;
        case "A":
          return 2;
        default:
          return 3;
      }
    };

    // Get base octave for the string
    const baseOctave = getBaseOctave(openNote, stringIndex);

    // Calculate octave change based on fret position
    const octaveChange = Math.floor(fret / 12);
    const resultingNote = calculateFretNote(openNote, fret);

    // Additional octave adjustment if we cross over from B to C
    const noteIndex = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ].indexOf(openNote);
    const resultingNoteIndex = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ].indexOf(resultingNote);
    const crossedOverC = noteIndex > resultingNoteIndex;

    return `${resultingNote}${
      baseOctave + octaveChange + (crossedOverC ? 1 : 0)
    }` as NoteWithOctave;
  };

  const fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

  return (
    <div ref={containerRef} className="w-full">
      <div className="w-full overflow-x-auto">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className={`border rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-slate-200 bg-slate-50"
          }`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `${flipX ? "scaleX(-1)" : ""} ${
              flipY ? "scaleY(-1)" : ""
            }`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {/* Background */}
          <rect
            width={dimensions.width}
            height={dimensions.height}
            fill={isDarkMode ? "#1f2937" : "#f8fafc"}
            className="transition-colors duration-200"
          />

          {/* Frets */}
          {getFretPositions(dimensions.width, fretCount).map((position, i) => (
            <line
              key={`fret-${i}`}
              x1={position}
              y1={0}
              x2={position}
              y2={dimensions.height}
              stroke={isDarkMode ? "#4b5563" : "#333"}
              strokeWidth={i === 0 ? 4 : 2}
              className="transition-colors duration-200"
            />
          ))}

          {/* Fret Markers */}
          {fretMarkers.map((fret) => {
            const position = getFretPositions(dimensions.width, fretCount)[fret];
            if (position) {
              const isDoubleDot = fret === 12 || fret === 24;
              return (
                <g key={`marker-${fret}`} transform={`translate(${position}, ${dimensions.height / 2})`}>
                  <circle
                    r={isDoubleDot ? stringSpacing / 6 : stringSpacing / 8}
                    fill="url(#abalone)"
                  />
                  {isDoubleDot && (
                    <circle
                      r={stringSpacing / 8}
                      fill="url(#abalone)"
                      transform={`translate(0, ${stringSpacing / 4})`}
                    />
                  )}
                </g>
              );
            }
            return null;
          })}

          {/* Strings - using the adjusted scaleRoot */}
          {[...adjustedTuning.strings]
            .reverse()
            .map((openNote, stringIndex) => (
              <g key={`string-${stringIndex}`} className="group">
                {/* String line */}
                <line
                  x1={0}
                  y1={(stringIndex + 1) * stringSpacing}
                  x2={dimensions.width}
                  y2={(stringIndex + 1) * stringSpacing}
                  stroke={isDarkMode ? "#9ca3af" : "#666"}
                  strokeWidth={getStringThickness(
                    stringIndex,
                    adjustedTuning.strings.length
                  )}
                  className="transition-colors duration-200"
                />

                {/* Tuning label */}
                <text
                  x={-10}
                  y={(stringIndex + 1) * stringSpacing}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill={isDarkMode ? "#9ca3af" : "#666"}
                  fontSize={Math.min(12, stringSpacing / 4)}
                  className="transition-colors duration-200"
                >
                  <title>{`String ${
                    adjustedTuning.strings.length - stringIndex
                  }: ${openNote}`}</title>
                  {openNote}
                </text>

                {/* Zero fret note */}
                {isNoteInScale(openNote, scale) && (
                  <g
                    transform={`translate(${stringSpacing / 4}, ${
                      (stringIndex + 1) * stringSpacing
                    })`}
                    onClick={() =>
                      playNote(
                        calculateNoteWithOctave(openNote, stringIndex, 0)
                      )
                    }
                    className="cursor-pointer"
                  >
                    <circle
                      r={Math.min(stringSpacing / 3.5, stringSpacing / 3.5)}
                      fill={getNoteColor(
                        openNote,
                        scale,
                        isDarkMode,
                        highlightRoots
                      )}
                      className="transition-colors duration-200"
                    />
                    <text
                      fill={
                        isDarkMode
                          ? "#1f2937"
                          : openNote === scale.root
                          ? "#ffffff"
                          : "#1f2937"
                      }
                      fontSize={Math.min(stringSpacing / 3, stringSpacing / 3)}
                      textAnchor="middle"
                      dy=".3em"
                      className="select-none font-bold transition-colors duration-200"
                      style={{
                        textShadow: isDarkMode
                          ? "0 0 1px rgba(0,0,0,0.3)"
                          : "none",
                        transform: `${flipX ? "scale(-1, 1)" : ""} ${
                          flipY ? "scale(1, -1)" : ""
                        }`,
                      }}
                    >
                      {showDegrees
                        ? getScaleDegree(openNote, scale)
                        : showFlats
                        ? sharpToFlat(openNote)
                        : openNote}
                    </text>
                  </g>
                )}

                {/* Fretted notes */}
                {Array.from({ length: fretCount }, (_, fretIndex) => {
                  const note = calculateFretNote(openNote as Note, fretIndex);
                  const noteWithOctave = calculateNoteWithOctave(
                    openNote,
                    stringIndex,
                    fretIndex
                  );
                  const inScale = isNoteInScale(note, scale);
                  const isRoot = note === scale.root;
                  return (
                    inScale && (
                      <g
                        key={`note-${stringIndex}-${fretIndex}`}
                        transform={`translate(${
                          getFretPositions(dimensions.width, fretCount)[
                            fretIndex
                          ] -
                          stringSpacing / 4
                        }, ${(stringIndex + 1) * stringSpacing})`}
                        onClick={() => playNote(noteWithOctave)}
                        className="cursor-pointer"
                      >
                        <circle
                          r={Math.min(stringSpacing / 3.5, stringSpacing / 3.5)}
                          fill={getNoteColor(
                            note,
                            scale,
                            isDarkMode,
                            highlightRoots
                          )}
                          className="transition-colors duration-200"
                        />
                        <text
                          fill={
                            isDarkMode
                              ? "#1f2937"
                              : isRoot
                              ? "#ffffff"
                              : "#1f2937"
                          }
                          fontSize={Math.min(
                            stringSpacing / 3,
                            stringSpacing / 3
                          )}
                          textAnchor="middle"
                          dy=".3em"
                          className="select-none font-bold transition-colors duration-200"
                          style={{
                            textShadow: isDarkMode
                              ? "0 0 1px rgba(0,0,0,0.3)"
                              : "none",
                            transform: `${flipX ? "scale(-1, 1)" : ""} ${
                              flipY ? "scale(1, -1)" : ""
                            }`,
                          }}
                        >
                          {showDegrees
                            ? getScaleDegree(note, scale)
                            : showFlats
                            ? sharpToFlat(note)
                            : note}
                        </text>
                      </g>
                    )
                  );
                })}
              </g>
            ))}

          {/* Fret numbers */}
          {Array.from({ length: fretCount + 1 }).map((_, i) => (
            <text
              key={`fret-number-${i}`}
              x={
                getFretPositions(dimensions.width, fretCount)[i] -
                stringSpacing / 2
              }
              y={dimensions.height - 5}
              textAnchor="middle"
              fill={isDarkMode ? "#9ca3af" : "#666"}
              fontSize={Math.min(12, stringSpacing / 4)}
              className="transition-colors duration-200"
              style={{
                transform: `${flipX ? "scale(-1, 1)" : ""} ${
                  flipY ? "scale(1, -1)" : ""
                }`,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            >
              {i}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};
