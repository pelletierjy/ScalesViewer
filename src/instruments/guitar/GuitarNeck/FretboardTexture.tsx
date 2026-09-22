import React from 'react';

interface FretboardTextureProps {
  texture: string;
  className?: string;
}

// CSS styles for wood texture backgrounds
const getTextureStyles = (texture: string) => {
  // Use JPG for ebony (real image), SVG for others (placeholders)
  const imagePath = `/textures/${texture}.jpg`;
  
  return {
    backgroundImage: `url(${imagePath})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', // Stretch to cover entire area
    backgroundPosition: 'center',
  };
};

export const FretboardTexture: React.FC<FretboardTextureProps> = ({ texture, className = '' }) => {
  const textureStyles = getTextureStyles(texture);
  
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={textureStyles}
    />
  );
};

export const getTexturePatternUrl = (texture: string): string => {
  // For compatibility, return a CSS style instead of SVG pattern URL
  return `url(/textures/${texture}.svg)`;
};

export const getTextureClassName = (texture: string): string => {
  return `fretboard-texture-${texture}`;
};