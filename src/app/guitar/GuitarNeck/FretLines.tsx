import React from 'react';
import { getMultiscaleFretEndpoints } from './getMultiscaleFretPositions';

interface FretLinesProps {
  isMultiscale: boolean;
  fretCount: number;
  fretPositions: number[][] | number[];
  stringSpacing: number;
  stringCount: number;
  perpendicular: number;
  isDarkMode: boolean;
}

export const FretLines: React.FC<FretLinesProps> = ({
  isMultiscale,
  fretCount,
  fretPositions,
  stringSpacing,
  stringCount,
  perpendicular,
  isDarkMode,
}) => {
  if (isMultiscale) {
    // Multiscale: Draw angled frets
    return (
      <>
        {Array.from({ length: fretCount + 1 }, (_, i) => {
          const endpoints = getMultiscaleFretEndpoints(
            fretPositions as number[][],
            stringSpacing,
            stringCount,
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
        })}
      </>
    );
  } else {
    // Standard: Draw straight frets
    const standardPositions = fretPositions as number[];
    return (
      <>
        {standardPositions.map((position, i) => (
          <line
            key={`fret-${i}`}
            x1={position}
            y1={stringSpacing}
            x2={position}
            y2={stringCount * stringSpacing}
            stroke={i === 0 
              ? isDarkMode ? "#d1d5db" : "#1f2937"
              : isDarkMode ? "#4b5563" : "#333"
            }
            strokeWidth={i === 0 ? 8 : 2}
            className="transition-colors duration-200"
          />
        ))}
      </>
    );
  }
};