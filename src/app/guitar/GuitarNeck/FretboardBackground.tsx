import React from 'react';

interface FretboardBackgroundProps {
  isMultiscale: boolean;
  fretPositions: number[][] | number[];
  fretCount: number;
  stringSpacing: number;
  stringCount: number;
  fretboardColor: string;
  isDarkMode: boolean;
  dimensions: { width: number; height: number };
}

export const FretboardBackground: React.FC<FretboardBackgroundProps> = ({
  isMultiscale,
  fretPositions,
  fretCount,
  stringSpacing,
  stringCount,
  fretboardColor,
  isDarkMode,
  dimensions,
}) => {
  if (isMultiscale) {
    // For multiscale, create a path that follows the fanned frets
    const topStringPositions = Array.isArray(fretPositions[0]) 
      ? fretPositions[0] as number[]
      : fretPositions as number[];
    const bottomStringPositions = Array.isArray(fretPositions[stringCount - 1])
      ? fretPositions[stringCount - 1] as number[]
      : fretPositions as number[];
    
    // Create path points
    const pathPoints = [
      // Top edge: from first fret to last fret
      `M ${topStringPositions[0]} ${stringSpacing}`,
      `L ${topStringPositions[fretCount]} ${stringSpacing}`,
      // Right edge: from top string to bottom string at last fret
      `L ${bottomStringPositions[fretCount]} ${stringCount * stringSpacing}`,
      // Bottom edge: from last fret to first fret
      `L ${bottomStringPositions[0]} ${stringCount * stringSpacing}`,
      // Close path
      `Z`
    ];
    
    return (
      <>
        {/* Background */}
        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill={isDarkMode ? "#1f2937" : "#f8fafc"}
          className="transition-colors duration-200"
        />
        
        {/* Fretboard */}
        <path
          d={pathPoints.join(' ')}
          fill={fretboardColor}
          className="transition-colors duration-200"
        />
      </>
    );
  } else {
    // For standard guitars, use a simple rectangle
    const standardPositions = fretPositions as number[];
    const fretboardLeft = standardPositions[0];
    const fretboardRight = standardPositions[fretCount];
    
    return (
      <>
        {/* Background */}
        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill={isDarkMode ? "#1f2937" : "#f8fafc"}
          className="transition-colors duration-200"
        />
        
        {/* Fretboard */}
        <rect
          x={fretboardLeft}
          y={stringSpacing}
          width={fretboardRight - fretboardLeft}
          height={(stringCount - 1) * stringSpacing}
          fill={fretboardColor}
          className="transition-colors duration-200"
        />
      </>
    );
  }
};