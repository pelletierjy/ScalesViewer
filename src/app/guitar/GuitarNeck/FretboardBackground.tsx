import React from 'react';
import { FretboardTexture } from './FretboardTexture';
import { GuitarBody } from './GuitarBody';
import { GuitarHeadstock } from './GuitarHeadstock';

interface FretboardBackgroundProps {
  isMultiscale: boolean;
  fretPositions: number[][] | number[];
  fretCount: number;
  stringSpacing: number;
  stringCount: number;
  fretboardTexture: string;
  isDarkMode: boolean;
  dimensions: { width: number; height: number };
}

export const FretboardBackground: React.FC<FretboardBackgroundProps> = ({
  isMultiscale,
  fretPositions,
  fretCount,
  stringSpacing,
  stringCount,
  fretboardTexture,
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
        
        {/* Guitar Body (behind fretboard) */}
        <GuitarBody
          fretboardRight={Array.isArray(fretPositions[0]) 
            ? (fretPositions[0] as number[])[fretCount]
            : (fretPositions as number[])[fretCount]
          }
          stringSpacing={stringSpacing}
          stringCount={stringCount}
          isDarkMode={isDarkMode}
        />
        
        {/* Guitar Headstock (behind fretboard) */}
        <GuitarHeadstock
          fretboardLeft={Array.isArray(fretPositions[0]) 
            ? (fretPositions[0] as number[])[0]
            : (fretPositions as number[])[0]
          }
          stringSpacing={stringSpacing}
          stringCount={stringCount}
          isDarkMode={isDarkMode}
        />
        
        {/* Fretboard with texture overlay */}
        <defs>
          <clipPath id={`fretboard-clip-${fretboardTexture}`}>
            <path d={pathPoints.join(' ')} />
          </clipPath>
        </defs>
        
        <g clipPath={`url(#fretboard-clip-${fretboardTexture})`}>
          <foreignObject 
            x={0} 
            y={stringSpacing} 
            width={dimensions.width || 1000} 
            height={Math.max((stringCount - 1) * stringSpacing, 100)}
          >
            <FretboardTexture texture={fretboardTexture} />
          </foreignObject>
        </g>
      </>
    );
  } else {
    // For standard guitars, use a simple rectangle
    const standardPositions = fretPositions as number[];
    const fretboardLeft = standardPositions?.[0] || 0;
    const fretboardRight = standardPositions?.[fretCount] || dimensions.width;
    
    // Ensure we have valid numbers and prevent NaN
    const validLeft = isNaN(fretboardLeft) ? 0 : fretboardLeft;
    const validRight = isNaN(fretboardRight) ? dimensions.width : fretboardRight;
    const validWidth = validRight - validLeft;
    const safeWidth = isNaN(validWidth) || validWidth <= 0 ? dimensions.width : validWidth;
    const safeHeight = (stringCount - 1) * stringSpacing;
    const validHeight = isNaN(safeHeight) || safeHeight <= 0 ? 100 : safeHeight;
    
    return (
      <>
        {/* Background */}
        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill={isDarkMode ? "#1f2937" : "#f8fafc"}
          className="transition-colors duration-200"
        />
        
        {/* Guitar Body (behind fretboard) */}
        <GuitarBody
          fretboardRight={validRight}
          stringSpacing={stringSpacing}
          stringCount={stringCount}
          isDarkMode={isDarkMode}
        />
        
        {/* Guitar Headstock (behind fretboard) */}
        <GuitarHeadstock
          fretboardLeft={validLeft}
          stringSpacing={stringSpacing}
          stringCount={stringCount}
          isDarkMode={isDarkMode}
        />
        
        {/* Fretboard with texture overlay */}
        <defs>
          <clipPath id={`standard-fretboard-clip-${fretboardTexture}`}>
            <rect
              x={validLeft}
              y={stringSpacing}
              width={safeWidth}
              height={validHeight}
            />
          </clipPath>
        </defs>
        
        <g clipPath={`url(#standard-fretboard-clip-${fretboardTexture})`}>
          <foreignObject 
            x={validLeft} 
            y={stringSpacing} 
            width={safeWidth} 
            height={validHeight}
          >
            <FretboardTexture texture={fretboardTexture} />
          </foreignObject>
        </g>
      </>
    );
  }
};