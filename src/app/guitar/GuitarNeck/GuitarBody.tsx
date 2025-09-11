import React from 'react';

interface GuitarBodyProps {
  fretboardRight: number;
  stringSpacing: number;
  stringCount: number;
  isDarkMode: boolean;
}

export const GuitarBody: React.FC<GuitarBodyProps> = ({
  fretboardRight,
  stringSpacing,
  stringCount,
  isDarkMode,
}) => {
  // Calculate body dimensions based on fretboard
  const bodyStartX = fretboardRight;
  const bodyWidth = stringSpacing * 8; // Make the body wider than the neck
  const bodyHeight = (stringCount - 1) * stringSpacing + stringSpacing * 2;
  const bodyTopY = stringSpacing * 0.5; // Start slightly above the first string
  const bodyBottomY = bodyTopY + bodyHeight;
  
  // Define the guitar body shape - double cutaway style
  const bodyPath = [
    // Start at the neck joint (top)
    `M ${bodyStartX} ${stringSpacing}`,
    
    // Upper cutaway curve
    `Q ${bodyStartX + bodyWidth * 0.1} ${bodyTopY - stringSpacing * 0.2}`,
    `${bodyStartX + bodyWidth * 0.3} ${bodyTopY}`,
    
    // Upper bout
    `Q ${bodyStartX + bodyWidth * 0.7} ${bodyTopY - stringSpacing * 0.3}`,
    `${bodyStartX + bodyWidth * 0.9} ${bodyTopY + stringSpacing}`,
    
    // Right edge to waist
    `Q ${bodyStartX + bodyWidth} ${bodyTopY + bodyHeight * 0.3}`,
    `${bodyStartX + bodyWidth * 0.85} ${bodyTopY + bodyHeight * 0.5}`,
    
    // Waist (narrowest part)
    `Q ${bodyStartX + bodyWidth * 0.8} ${bodyTopY + bodyHeight * 0.52}`,
    `${bodyStartX + bodyWidth * 0.85} ${bodyTopY + bodyHeight * 0.54}`,
    
    // Lower bout
    `Q ${bodyStartX + bodyWidth} ${bodyTopY + bodyHeight * 0.7}`,
    `${bodyStartX + bodyWidth * 0.9} ${bodyBottomY - stringSpacing}`,
    
    // Lower cutaway curve
    `Q ${bodyStartX + bodyWidth * 0.7} ${bodyBottomY + stringSpacing * 0.3}`,
    `${bodyStartX + bodyWidth * 0.3} ${bodyBottomY}`,
    
    // Back to neck joint (bottom)
    `Q ${bodyStartX + bodyWidth * 0.1} ${bodyBottomY + stringSpacing * 0.2}`,
    `${bodyStartX} ${bodyBottomY - stringSpacing}`,
    
    // Close path along the neck edge
    `L ${bodyStartX} ${stringSpacing}`,
    `Z`
  ].join(' ');

  return (
    <g className="guitar-body">
      {/* Guitar body shadow/depth */}
      <path
        d={bodyPath}
        fill={isDarkMode ? "#3c2415" : "#4a2c17"}
        stroke={isDarkMode ? "#6b4423" : "#5d3419"}
        strokeWidth="1"
        className="transition-colors duration-200"
        transform="translate(2, 2)"
        opacity="0.4"
      />
      
      {/* Main guitar body */}
      <path
        d={bodyPath}
        fill={isDarkMode ? "#5d3a1a" : "#7c4a1e"}
        stroke={isDarkMode ? "#8b5a2b" : "#925a2a"}
        strokeWidth="2"
        className="transition-colors duration-200"
      />
      
      {/* Sound hole */}
      <circle
        cx={bodyStartX + bodyWidth * 0.4}
        cy={bodyTopY + bodyHeight * 0.5}
        r={stringSpacing * 1.2}
        fill={isDarkMode ? "#000000" : "#1e293b"}
        stroke={isDarkMode ? "#374151" : "#475569"}
        strokeWidth="3"
        className="transition-colors duration-200"
      />
      
      {/* Sound hole inner ring */}
      <circle
        cx={bodyStartX + bodyWidth * 0.4}
        cy={bodyTopY + bodyHeight * 0.5}
        r={stringSpacing * 1.0}
        fill="none"
        stroke={isDarkMode ? "#4b5563" : "#64748b"}
        strokeWidth="1"
        className="transition-colors duration-200"
      />
    </g>
  );
};