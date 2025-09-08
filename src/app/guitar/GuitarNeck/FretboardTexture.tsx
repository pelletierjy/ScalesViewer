import React, { useState, useEffect } from 'react';
import { getCurrentTexture } from '../utils/textureManager';
import { generateEnhancedWoodTexture } from '../utils/enhancedWoodTextures';

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
  const [imageUrl, setImageUrl] = useState(isDarkMode ? texture.dark : texture.light);
  const [useFallback, setUseFallback] = useState(false);
  const patternId = `wood-pattern-${textureId}-${isDarkMode ? 'dark' : 'light'}-${useFallback ? 'fallback' : 'image'}`;

  useEffect(() => {
    const newImageUrl = isDarkMode ? texture.dark : texture.light;
    setImageUrl(newImageUrl);
    setUseFallback(false);

    // Check if the image URL is a generated SVG (data URL) or an external image
    if (newImageUrl.startsWith('data:')) {
      // Already using a data URL, no need to test loading
      return;
    }

    // Test if external image loads successfully
    const img = new Image();
    img.onload = () => {
      // Image loaded successfully, use it
      setImageUrl(newImageUrl);
      setUseFallback(false);
    };
    img.onerror = () => {
      // Image failed to load, use fallback
      const fallbackTexture = generateEnhancedWoodTexture(textureId, isDarkMode ? 'dark' : 'light');
      setImageUrl(fallbackTexture);
      setUseFallback(true);
    };
    img.src = newImageUrl;
  }, [textureId, isDarkMode, texture]);

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
      
      return `M ${fretboardLeft} ${stringSpacing} L ${fretboardRight} ${stringSpacing} L ${fretboardRight} ${stringCount * stringSpacing} L ${fretboardLeft} ${stringCount * stringSpacing} Z`;
    }
  };

  return (
    <>
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
            href={imageUrl}
            width="200" 
            height="200"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
      
      {/* Fretboard shape with wood texture */}
      <path
        d={getFretboardPath()}
        fill={`url(#${patternId})`}
        className="transition-all duration-200"
      />
    </>
  );
};