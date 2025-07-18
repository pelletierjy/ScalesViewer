import React, { useContext, useEffect, useRef, useState } from "react";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import {
  calculateFretNote,
} from "@/lib/utils/scaleUtils";
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
import { getFretPositions } from "./getFretPositions";
import { getMultiscaleFretPositions, getMultiscaleFretEndpoints } from "./getMultiscaleFretPositions";
import { getAdjustedTuning } from "./getAdjustedTuning";
import { FretMarkers } from "./FretMarkers";
import { StringGroup } from "./StringGroup";
import { FretNumbers } from "./FretNumbers";

export const GuitarNeck: React.FC<{ scaleRoot: TuningPreset }> = ({
  scaleRoot,
}) => {
  const {
    fretCount = 12,
    flipX = false,
    flipY = false,
    baseTuning = "E",
    isMultiscale = false,
    scaleLength = { treble: 25.5, bass: 27 },
    perpendicular = 9,
    fretboardColor = "#8B4513",
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
  
  // Calculate fret positions based on whether it's multiscale or not
  // Reserve 5% padding on each side
  const fretboardWidth = dimensions.width * 0.9;
  const fretboardOffset = dimensions.width * 0.05;
  
  const fretPositions = isMultiscale
    ? getMultiscaleFretPositions(
        fretboardWidth,
        fretCount,
        scaleRoot.strings.length,
        scaleLength.treble,
        scaleLength.bass,
        perpendicular
      ).map(stringPositions => 
        stringPositions.map(pos => pos + fretboardOffset)
      )
    : getFretPositions(fretboardWidth, fretCount).map(() => 
        getFretPositions(fretboardWidth, fretCount).map(pos => pos + fretboardOffset)
      );

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

          {/* Fretboard */}
          {(() => {
            if (isMultiscale) {
              // For multiscale, create a path that follows the fanned frets
              const topStringPositions = fretPositions[0];
              const bottomStringPositions = fretPositions[scaleRoot.strings.length - 1];
              
              // Create path points
              const pathPoints = [
                // Top edge: from first fret to last fret
                `M ${topStringPositions[0]} ${stringSpacing}`,
                `L ${topStringPositions[fretCount]} ${stringSpacing}`,
                // Right edge: from top string to bottom string at last fret
                `L ${bottomStringPositions[fretCount]} ${scaleRoot.strings.length * stringSpacing}`,
                // Bottom edge: from last fret to first fret
                `L ${bottomStringPositions[0]} ${scaleRoot.strings.length * stringSpacing}`,
                // Close path
                `Z`
              ];
              
              return (
                <path
                  d={pathPoints.join(' ')}
                  fill={fretboardColor}
                  className="transition-colors duration-200"
                />
              );
            } else {
              // For standard guitars, use a simple rectangle
              const fretboardLeft = fretPositions[0][0];
              const fretboardRight = fretPositions[0][fretCount];
              
              return (
                <rect
                  x={fretboardLeft}
                  y={stringSpacing}
                  width={fretboardRight - fretboardLeft}
                  height={(scaleRoot.strings.length - 1) * stringSpacing}
                  fill={fretboardColor}
                  className="transition-colors duration-200"
                />
              );
            }
          })()}

          {/* Frets */}
          {isMultiscale ? (
            // Multiscale: Draw angled frets
            Array.from({ length: fretCount + 1 }, (_, i) => {
              const endpoints = getMultiscaleFretEndpoints(
                fretPositions,
                stringSpacing,
                scaleRoot.strings.length,
                i
              );
              return (
                <line
                  key={`fret-${i}`}
                  x1={endpoints.x1}
                  y1={endpoints.y1}
                  x2={endpoints.x2}
                  y2={endpoints.y2}
                  stroke={
                    i === 0
                      ? isDarkMode ? "#d1d5db" : "#1f2937"
                      : i === perpendicular
                      ? isDarkMode ? "#60a5fa" : "#3b82f6"
                      : isDarkMode ? "#4b5563" : "#333"
                  }
                  strokeWidth={i === 0 ? 8 : i === perpendicular ? 3 : 2}
                  className="transition-colors duration-200"
                />
              );
            })
          ) : (
            // Standard: Draw straight frets
            getFretPositions(dimensions.width, fretCount).map((position, i) => (
              <line
                key={`fret-${i}`}
                x1={position}
                y1={0}
                x2={position}
                y2={dimensions.height}
                stroke={i === 0 
                  ? isDarkMode ? "#d1d5db" : "#1f2937"
                  : isDarkMode ? "#4b5563" : "#333"
                }
                strokeWidth={i === 0 ? 8 : 2}
                className="transition-colors duration-200"
              />
            ))
          )}

          {/* Fret Markers */}
          <FretMarkers
            fretMarkers={fretMarkers}
            fretPositions={isMultiscale ? fretPositions : getFretPositions(fretboardWidth, fretCount).map(pos => pos + fretboardOffset)}
            dimensions={dimensions}
            stringSpacing={stringSpacing}
            isDarkMode={isDarkMode}
            isMultiscale={isMultiscale}
            stringCount={scaleRoot.strings.length}
          />

          {/* String Group */}
          <StringGroup
            adjustedTuning={adjustedTuning}
            dimensions={dimensions}
            stringSpacing={stringSpacing}
            fretCount={fretCount}
            scale={scale}
            isDarkMode={isDarkMode}
            showDegrees={showDegrees}
            showFlats={showFlats}
            highlightRoots={highlightRoots}
            flipX={flipX}
            flipY={flipY}
            calculateNoteWithOctave={calculateNoteWithOctave}
            isMultiscale={isMultiscale}
            fretPositions={fretPositions}
          />

          {/* Fret numbers */}
          <FretNumbers
            fretCount={fretCount}
            dimensions={dimensions}
            stringSpacing={stringSpacing}
            isDarkMode={isDarkMode}
            flipX={flipX}
            flipY={flipY}
            isMultiscale={isMultiscale}
            fretPositions={fretPositions}
            stringCount={scaleRoot.strings.length}
          />
        </svg>
      </div>
    </div>
  );
};
