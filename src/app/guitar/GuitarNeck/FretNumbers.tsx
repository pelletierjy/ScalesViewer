import React from 'react';
import { getFretPositions } from './getFretPositions';

interface FretNumbersProps {
  fretCount: number;
  dimensions: { width: number; height: number };
  stringSpacing: number;
  isDarkMode: boolean;
  flipX: boolean;
  flipY: boolean;
}

export const FretNumbers: React.FC<FretNumbersProps> = ({
  fretCount,
  dimensions,
  stringSpacing,
  isDarkMode,
  flipX,
  flipY,
}) => {
  return (
    <>
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
    </>
  );
}; 