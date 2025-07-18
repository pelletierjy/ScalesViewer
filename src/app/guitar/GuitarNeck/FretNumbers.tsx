import React from 'react';
import { getFretPositions } from './getFretPositions';

interface FretNumbersProps {
  fretCount: number;
  dimensions: { width: number; height: number };
  stringSpacing: number;
  isDarkMode: boolean;
  flipX: boolean;
  flipY: boolean;
  isMultiscale?: boolean;
  fretPositions?: number[][];
  stringCount?: number;
}

export const FretNumbers: React.FC<FretNumbersProps> = ({
  fretCount,
  dimensions,
  stringSpacing,
  isDarkMode,
  flipX,
  flipY,
  isMultiscale = false,
  fretPositions = [],
  stringCount = 6,
}) => {
  return (
    <>
      {Array.from({ length: fretCount + 1 }).map((_, i) => {
        // For multiscale, use the bottom string position; for standard, use regular positions
        const xPosition = isMultiscale && fretPositions.length > 0
          ? fretPositions[stringCount - 1][i] - stringSpacing / 2
          : getFretPositions(dimensions.width, fretCount)[i] - stringSpacing / 2;
          
        return (
          <text
            key={`fret-number-${i}`}
            x={xPosition}
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
        );
      })}
    </>
  );
}; 