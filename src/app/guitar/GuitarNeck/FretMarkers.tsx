import React from 'react';

interface FretMarkersProps {
  fretMarkers: number[];
  fretPositions: number[] | number[][];
  dimensions: { width: number; height: number };
  stringSpacing: number;
  isDarkMode: boolean;
  isMultiscale?: boolean;
  stringCount?: number;
}

export const FretMarkers: React.FC<FretMarkersProps> = ({
  fretMarkers,
  fretPositions,
  dimensions,
  stringSpacing,
  isDarkMode,
  isMultiscale = false,
  stringCount = 6,
}) => {
  return (
    <>
      {fretMarkers.map((fret) => {
        let markerPosition;
        
        if (isMultiscale && Array.isArray(fretPositions[0])) {
          // For multiscale, calculate the average position across all strings
          const positions = fretPositions as number[][];
          let currentSum = 0;
          let previousSum = 0;
          
          for (let i = 0; i < stringCount; i++) {
            currentSum += positions[i][fret];
            previousSum += positions[i][fret - 1];
          }
          
          const currentAvg = currentSum / stringCount;
          const previousAvg = previousSum / stringCount;
          markerPosition = (currentAvg + previousAvg) / 2;
        } else {
          // Standard guitar
          const positions = fretPositions as number[];
          const currentFretPosition = positions[fret];
          const previousFretPosition = positions[fret - 1];
          if (!currentFretPosition || !previousFretPosition) return null;
          markerPosition = (currentFretPosition + previousFretPosition) / 2;
        }
        
        const isDoubleDot = fret === 12 || fret === 24;
        return (
          <g key={`marker-${fret}`} transform={`translate(${markerPosition}, ${dimensions.height / 2})`}>
            {!isDoubleDot && (
              <circle
                r={stringSpacing / 8}
                fill={isDarkMode ? "#DDDDDD" : "#505050"}
              />
            )}
            {isDoubleDot && (
              <>
                <circle
                  r={stringSpacing / 8}
                  fill={isDarkMode ? "#DDDDDD" : "#505050"}
                  transform={`translate(0, ${-stringSpacing * 2})`}
                />
                <circle
                  r={stringSpacing / 8}
                  fill={isDarkMode ? "#DDDDDD" : "#505050"}
                  transform={`translate(0, ${stringSpacing * 2})`}
                />
              </>
            )}
          </g>
        );
      })}
    </>
  );
}; 