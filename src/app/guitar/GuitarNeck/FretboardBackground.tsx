import React from 'react';
import { FretboardTexture } from './FretboardTexture';

interface FretboardBackgroundProps {
  isMultiscale: boolean;
  fretPositions: number[][] | number[];
  fretCount: number; // Kept for API consistency
  stringSpacing: number;
  stringCount: number;
  fretboardTexture: string;
  isDarkMode: boolean;
  dimensions: { width: number; height: number };
}

export const FretboardBackground: React.FC<FretboardBackgroundProps> = ({
  isMultiscale,
  fretPositions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fretCount, // Kept for API compatibility
  stringSpacing,
  stringCount,
  fretboardTexture,
  isDarkMode,
  dimensions,
}) => {
  if (isMultiscale) {
    // For multiscale, create a path that follows the fanned frets
    // Path generation is handled in FretboardTexture component
    
    return (
      <>
        {/* Background */}
        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill={isDarkMode ? "#1f2937" : "#f8fafc"}
          className="transition-colors duration-200"
        />
        
        {/* Wood Texture Fretboard */}
        <FretboardTexture
          textureId={fretboardTexture}
          isDarkMode={isDarkMode}
          isMultiscale={isMultiscale}
          fretPositions={fretPositions}
          stringSpacing={stringSpacing}
          stringCount={stringCount}
          dimensions={dimensions}
        />
      </>
    );
  } else {
    // For standard guitars, use a simple rectangle (coordinates handled in FretboardTexture)
    
    return (
      <>
        {/* Background */}
        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill={isDarkMode ? "#1f2937" : "#f8fafc"}
          className="transition-colors duration-200"
        />
        
        {/* Wood Texture Fretboard */}
        <FretboardTexture
          textureId={fretboardTexture}
          isDarkMode={isDarkMode}
          isMultiscale={isMultiscale}
          fretPositions={fretPositions}
          stringSpacing={stringSpacing}
          stringCount={stringCount}
          dimensions={dimensions}
        />
      </>
    );
  }
};