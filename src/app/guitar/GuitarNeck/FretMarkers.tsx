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
          // For multiscale, use the middle string position for better visual alignment
          const positions = fretPositions as number[][];
          const middleString = Math.floor(stringCount / 2);
          
          // Ensure we have valid positions for the fret
          if (!positions[middleString] || !positions[middleString][fret] || !positions[middleString][fret - 1]) {
            return null;
          }
          
          const currentFretPosition = positions[middleString][fret];
          const previousFretPosition = positions[middleString][fret - 1];
          markerPosition = (currentFretPosition + previousFretPosition) / 2;
        } else {
          // Standard guitar
          const positions = fretPositions as number[];
          const currentFretPosition = positions[fret];
          const previousFretPosition = positions[fret - 1];
          if (!currentFretPosition || !previousFretPosition) return null;
          markerPosition = (currentFretPosition + previousFretPosition) / 2;
        }
        
        const isDoubleDot = fret === 12 || fret === 24;
        
        // For multiscale double dots, calculate positions along the angled fret
        if (isDoubleDot && isMultiscale && Array.isArray(fretPositions[0])) {
          const positions = fretPositions as number[][];
          
          // Calculate positions for dots at 1/3 and 2/3 of the neck height
          const upperStringIndex = Math.floor(stringCount / 3);
          const lowerStringIndex = Math.floor((2 * stringCount) / 3);
          
          // Get fret positions for the two strings where dots will be placed
          const upperCurrentFret = positions[upperStringIndex][fret];
          const upperPreviousFret = positions[upperStringIndex][fret - 1];
          const upperMarkerX = (upperCurrentFret + upperPreviousFret) / 2;
          
          const lowerCurrentFret = positions[lowerStringIndex][fret];
          const lowerPreviousFret = positions[lowerStringIndex][fret - 1];
          const lowerMarkerX = (lowerCurrentFret + lowerPreviousFret) / 2;
          
          // Calculate Y positions based on string positions
          const upperMarkerY = (upperStringIndex + 1) * stringSpacing;
          const lowerMarkerY = (lowerStringIndex + 1) * stringSpacing;
          
          return (
            <g key={`marker-${fret}`}>
              <circle
                cx={upperMarkerX}
                cy={upperMarkerY}
                r={stringSpacing / 8}
                fill={isDarkMode ? "#DDDDDD" : "#505050"}
              />
              <circle
                cx={lowerMarkerX}
                cy={lowerMarkerY}
                r={stringSpacing / 8}
                fill={isDarkMode ? "#DDDDDD" : "#505050"}
              />
            </g>
          );
        }
        
        // Standard single dot or non-multiscale double dot
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