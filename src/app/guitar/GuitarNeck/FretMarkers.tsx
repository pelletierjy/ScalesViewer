import React from 'react';

interface FretMarkersProps {
  fretMarkers: number[];
  fretPositions: number[];
  dimensions: { width: number; height: number };
  stringSpacing: number;
  isDarkMode: boolean;
}

export const FretMarkers: React.FC<FretMarkersProps> = ({
  fretMarkers,
  fretPositions,
  dimensions,
  stringSpacing,
  isDarkMode,
}) => {
  return (
    <>
      {fretMarkers.map((fret) => {
        const currentFretPosition = fretPositions[fret];
        const previousFretPosition = fretPositions[fret - 1];
        if (currentFretPosition && previousFretPosition) {
          const markerPosition = (currentFretPosition + previousFretPosition) / 2;
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
        }
        return null;
      })}
    </>
  );
}; 