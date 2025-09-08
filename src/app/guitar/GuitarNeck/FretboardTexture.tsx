import React from 'react';
import { getCurrentTexture } from '../utils/textureManager';

interface FretboardTextureProps {
  textureId: string;
  isDarkMode: boolean;
  isMultiscale: boolean;
  fretPositions: number[][] | number[];
  stringSpacing: number;
  stringCount: number;
  dimensions: { width: number; height: number };
}

export const FretboardTexture: React.FC<FretboardTextureProps> = ({
  textureId,
  isDarkMode,
  isMultiscale,
  fretPositions,
  stringSpacing,
  stringCount,
}) => {
  const texture = getCurrentTexture(textureId);
  const patternId = `wood-pattern-${textureId}-${isDarkMode ? 'dark' : 'light'}`;

  const getFretboardPath = () => {
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
        `L ${topStringPositions[topStringPositions.length - 1]} ${stringSpacing}`,
        // Right edge: from top string to bottom string at last fret
        `L ${bottomStringPositions[bottomStringPositions.length - 1]} ${stringCount * stringSpacing}`,
        // Bottom edge: from last fret to first fret
        `L ${bottomStringPositions[0]} ${stringCount * stringSpacing}`,
        // Close path
        `Z`
      ];
      
      return pathPoints.join(' ');
    } else {
      // For standard guitars, use a simple rectangle
      const standardPositions = fretPositions as number[];
      const fretboardLeft = standardPositions[0];
      const fretboardRight = standardPositions[standardPositions.length - 1];
      
      return `
        M ${fretboardLeft} ${stringSpacing}
        L ${fretboardRight} ${stringSpacing}
        L ${fretboardRight} ${stringCount * stringSpacing}
        L ${fretboardLeft} ${stringCount * stringSpacing}
        Z
      `;
    }
  };

  return (
    <defs>
      {/* Wood texture pattern */}
      <pattern 
        id={patternId} 
        patternUnits="userSpaceOnUse" 
        width="200" 
        height="200"
        patternTransform="rotate(15)"
      >
        <image 
          href={isDarkMode ? texture.dark : texture.light}
          width="200" 
          height="200"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
      
      {/* Fretboard shape with wood texture */}
      <path
        d={getFretboardPath()}
        fill={`url(#${patternId})`}
        className="transition-all duration-200"
      />
    </defs>
  );
};