import React, { useContext, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { NoteWithOctave } from "@/lib/utils/note";
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
import { getMultiscaleFretPositions } from "./getMultiscaleFretPositions";
import { getAdjustedTuning } from "./getAdjustedTuning";
import { FretMarkers } from "./FretMarkers";
import { StringGroup } from "./StringGroup";
import { FretNumbers } from "./FretNumbers";
import { calculateNoteWithOctaveMemoized } from "../utils/octaveCalculation";
import { FretboardBackground } from "./FretboardBackground";

export const GuitarNeck: React.FC = React.memo(() => {
  const {
    fretCount,
    flipX,
    flipY,
    baseTuning,
    isMultiscale,
    scaleLength,
    perpendicular,
    fretboardTexture,
    stringSpacing,
    scaleRoot,
    stringEnabled,
    setStringEnabled,
    fretPositionEnabled,
    setFretPositionEnabled,
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
      const fullWidth = container.clientWidth || 1000; // fallback width
      const checkboxColumnWidth = 28 + 8; // column + gap
      const containerWidth = Math.max(100, fullWidth - checkboxColumnWidth);
      const baseHeight = Math.max(containerWidth * 0.2, 150);
      // Use string spacing setting to determine the divider (8 for normal, 6 for enlarged)
      const spacingDivider = stringSpacing === 'normal' ? 8 : 6;
      const heightPerString = baseHeight / spacingDivider;
      const adjustedHeight = heightPerString * (scaleRoot.strings.length + 1);
      
      // Ensure we have valid numbers
      const validWidth = isNaN(containerWidth) || containerWidth <= 0 ? 1000 : containerWidth;
      const validHeight = isNaN(adjustedHeight) || adjustedHeight <= 0 ? 200 : adjustedHeight;
      
      setDimensions({
        width: validWidth,
        height: validHeight,
      });
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [scaleRoot.strings.length, stringSpacing]);

  // Memoize expensive calculations
  const calculatedStringSpacing = useMemo(
    () => dimensions.height / (scaleRoot.strings.length + 1),
    [dimensions.height, scaleRoot.strings.length]
  );

  const adjustedTuning = useMemo(
    () => getAdjustedTuning(scaleRoot, baseTuning),
    [scaleRoot, baseTuning]
  );

  // Memoized calculation function for note with octave
  const calculateNoteWithOctave = useCallback(
    (openNote: string, stringIndex: number, fret: number): NoteWithOctave => {
      return calculateNoteWithOctaveMemoized(
        openNote as Parameters<typeof calculateNoteWithOctaveMemoized>[0],
        stringIndex,
        scaleRoot.strings.length,
        fret
      );
    },
    [scaleRoot.strings.length]
  );

  // Memoize fret calculations
  const fretMarkers = useMemo(() => [3, 5, 7, 9, 12, 15, 17, 19, 21, 24], []);
  
  const { standardFretPositions, fretPositions } = useMemo(() => {
    // Ensure we have a valid width before calculating
    if (!dimensions.width || dimensions.width <= 0 || isNaN(dimensions.width)) {
      const fallbackPositions = Array.from({ length: fretCount + 1 }, (_, i) => i * 50);
      return {
        standardFretPositions: fallbackPositions,
        fretPositions: Array(scaleRoot.strings.length).fill(fallbackPositions)
      };
    }
    
    // Calculate fret positions based on whether it's multiscale or not
    // Use full width for standard mode, reserve padding for multiscale
    const width = isMultiscale ? dimensions.width * 0.9 : dimensions.width;
    const offset = isMultiscale ? dimensions.width * 0.05 : 0;
    
    const standardPositions = getFretPositions(width, fretCount).map(pos => {
      const position = pos + offset;
      return isNaN(position) ? 0 : position;
    });
    
    const positions = isMultiscale
      ? getMultiscaleFretPositions(
          width,
          fretCount,
          scaleRoot.strings.length,
          scaleLength.treble,
          scaleLength.bass,
          perpendicular
        ).map(stringPositions => 
          stringPositions.map(pos => {
            const position = pos + offset;
            return isNaN(position) ? 0 : position;
          })
        )
      : Array(scaleRoot.strings.length).fill(standardPositions);
    
    return {
      standardFretPositions: standardPositions,
      fretPositions: positions
    };
  }, [isMultiscale, dimensions.width, fretCount, scaleRoot.strings.length, scaleLength.treble, scaleLength.bass, perpendicular]);

  // Order of checkboxes matches visual order (when flipY, top string is last in array)
  const stringOrder = useMemo(
    () =>
      flipY
        ? Array.from({ length: scaleRoot.strings.length }, (_, i) => scaleRoot.strings.length - 1 - i)
        : Array.from({ length: scaleRoot.strings.length }, (_, i) => i),
    [scaleRoot.strings.length, flipY]
  );

  // Fret checkbox positions: aligned under note positions (open string note at nut+circleRadius, fretted notes at fret line - stringSpacing/4)
  const fretCheckboxPositions = useMemo(() => {
    const positions = standardFretPositions as number[];
    const width = dimensions.width || 1000;
    const circleRadius = (calculatedStringSpacing / 3.5) * 1.41;
    const noteOffset = calculatedStringSpacing / 4;
    const result: number[] = [];
    result[0] = ((positions[0] + circleRadius) / width) * 100;
    for (let i = 1; i <= fretCount; i++) {
      result[i] = ((positions[i] - noteOffset) / width) * 100;
    }
    return result;
  }, [standardFretPositions, fretCount, dimensions.width, calculatedStringSpacing]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-start gap-2 w-full">
        {/* Checkbox column: one per string, aligned with string rows */}
        <div
          className="relative shrink-0 flex flex-col"
          style={{ width: 28, height: dimensions.height }}
          aria-label="String enable toggles"
        >
          {stringOrder.map((stringIdx, i) => (
            <label
              key={stringIdx}
              className="absolute flex items-center cursor-pointer"
              style={{
                left: 0,
                top: (i + 1) * calculatedStringSpacing - 4,
                transform: "translateY(-50%)",
              }}
            >
              <input
                type="checkbox"
                checked={stringEnabled[stringIdx] ?? true}
                onChange={() =>
                  setStringEnabled((prev) => {
                    const next = [...prev];
                    next[stringIdx] = !(next[stringIdx] ?? true);
                    return next;
                  })
                }
                className={`h-4 w-4 rounded border focus:ring-2 focus:ring-offset-1 ${
                  isDarkMode
                    ? "border-gray-500 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                    : "border-gray-400 bg-white text-blue-600 focus:ring-blue-500 focus:ring-offset-white"
                }`}
                aria-label={`String ${stringIdx + 1} ${stringEnabled[stringIdx] ?? true ? "enabled" : "disabled"}`}
              />
            </label>
          ))}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
        <svg
          width="100%"
          height={dimensions.height || 200}
          viewBox={`0 0 ${dimensions.width || 1000} ${dimensions.height || 200}`}
          className={`border rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-slate-300 bg-white"
          }`}
          preserveAspectRatio="xMinYMid meet"
          style={{
            transform: `${flipX ? "scaleX(-1)" : ""} ${
              flipY ? "scaleY(-1)" : ""
            }`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {/* Fretboard Background with Texture */}
          <FretboardBackground
            isMultiscale={isMultiscale}
            fretPositions={fretPositions}
            fretCount={fretCount}
            stringSpacing={calculatedStringSpacing}
            fretboardTexture={fretboardTexture}
            isDarkMode={isDarkMode}
            dimensions={dimensions}
          />

          {/* Frets */}
          {isMultiscale ? (
            // Multiscale: Draw angled frets
            Array.from({ length: fretCount + 1 }, (_, i) => {
              const topStringPositions = Array.isArray(fretPositions[0]) 
                ? fretPositions[0] as number[]
                : fretPositions as number[];
              const bottomStringPositions = Array.isArray(fretPositions[scaleRoot.strings.length - 1])
                ? fretPositions[scaleRoot.strings.length - 1] as number[]
                : fretPositions as number[];
              
              const endpoints = {
                x1: topStringPositions?.[i] || 0,
                y1: calculatedStringSpacing,
                x2: bottomStringPositions?.[i] || 0,
                y2: scaleRoot.strings.length * calculatedStringSpacing
              };
              
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
            (standardFretPositions as number[]).map((position, i) => (
              <line
                key={`fret-${i}`}
                x1={position}
                y1={calculatedStringSpacing}
                x2={position}
                y2={scaleRoot.strings.length * calculatedStringSpacing}
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
            fretPositions={isMultiscale ? fretPositions : standardFretPositions}
            dimensions={dimensions}
            stringSpacing={calculatedStringSpacing}
            isDarkMode={isDarkMode}
            isMultiscale={isMultiscale}
          />

          {/* String Group */}
          <StringGroup
            adjustedTuning={adjustedTuning}
            dimensions={dimensions}
            stringSpacing={calculatedStringSpacing}
            fretCount={fretCount}
            scale={scale}
            isDarkMode={isDarkMode}
            showDegrees={showDegrees}
            showFlats={showFlats}
            highlightRoots={highlightRoots}
            flipX={flipX}
            flipY={flipY}
            calculateNoteWithOctave={calculateNoteWithOctave}
            fretPositions={fretPositions}
            stringEnabled={stringEnabled}
            fretPositionEnabled={fretPositionEnabled}
          />

          {/* Fret numbers */}
          <FretNumbers
            fretCount={fretCount}
            dimensions={dimensions}
            stringSpacing={calculatedStringSpacing}
            isDarkMode={isDarkMode}
            flipX={flipX}
            flipY={flipY}
            isMultiscale={isMultiscale}
            fretPositions={isMultiscale ? fretPositions : standardFretPositions}
          />
        </svg>
        {/* Fret position checkboxes: open string + one per fret, below the neck, aligned under note positions */}
        <div
          className="relative w-full py-1"
          style={{
            height: 28,
            transform: flipX ? "scaleX(-1)" : undefined,
          }}
          aria-label="Fret position enable toggles"
        >
          {Array.from({ length: fretCount + 1 }, (_, i) => (
            <label
              key={i}
              className="absolute flex items-center justify-center cursor-pointer"
              style={{
                left: `${fretCheckboxPositions[i]}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <input
                type="checkbox"
                checked={fretPositionEnabled[i] ?? true}
                onChange={() =>
                  setFretPositionEnabled((prev) => {
                    const next = [...prev];
                    next[i] = !(next[i] ?? true);
                    return next;
                  })
                }
                className={`h-3 w-3 rounded border focus:ring-2 focus:ring-offset-1 ${
                  isDarkMode
                    ? "border-gray-500 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                    : "border-gray-400 bg-white text-blue-600 focus:ring-blue-500 focus:ring-offset-white"
                }`}
                aria-label={
                  i === 0
                    ? `Open string ${fretPositionEnabled[i] ?? true ? "enabled" : "disabled"}`
                    : `Fret ${i} ${fretPositionEnabled[i] ?? true ? "enabled" : "disabled"}`
                }
              />
            </label>
          ))}
        </div>
        </div>
      </div>
      </div>
    </div>
  );
});

GuitarNeck.displayName = 'GuitarNeck';
