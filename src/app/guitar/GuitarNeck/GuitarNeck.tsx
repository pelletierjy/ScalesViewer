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
      const containerWidth = container.clientWidth || 1000; // fallback width
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

  return (
    <div ref={containerRef} className="w-full">
      <div className="w-full">
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
            stringCount={scaleRoot.strings.length}
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
            stringCount={scaleRoot.strings.length}
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
            stringCount={scaleRoot.strings.length}
          />
        </svg>
      </div>
    </div>
  );
});

GuitarNeck.displayName = 'GuitarNeck';
