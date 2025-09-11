import React from 'react';

interface GuitarHeadstockProps {
  fretboardLeft: number;
  stringSpacing: number;
  stringCount: number;
  isDarkMode: boolean;
}

export const GuitarHeadstock: React.FC<GuitarHeadstockProps> = ({
  fretboardLeft,
  stringSpacing,
  stringCount,
  isDarkMode,
}) => {
  // Calculate headstock dimensions based on fretboard
  const headstockWidth = stringSpacing * 4; // Make the headstock wider than the neck
  const headstockStartX = fretboardLeft - headstockWidth;
  const headstockHeight = (stringCount - 1) * stringSpacing + stringSpacing * 1.5;
  const headstockTopY = stringSpacing * 0.75; // Start slightly above the first string
  const headstockBottomY = headstockTopY + headstockHeight;
  
  // Define the guitar headstock shape - classic 3+3 or 6-inline style
  const headstockPath = [
    // Start at the nut (neck joint)
    `M ${fretboardLeft} ${stringSpacing}`,
    
    // Top edge with slight curve
    `Q ${headstockStartX + headstockWidth * 0.8} ${headstockTopY - stringSpacing * 0.1}`,
    `${headstockStartX + headstockWidth * 0.3} ${headstockTopY}`,
    
    // Left upper curve
    `Q ${headstockStartX + headstockWidth * 0.1} ${headstockTopY + stringSpacing * 0.3}`,
    `${headstockStartX} ${headstockTopY + headstockHeight * 0.3}`,
    
    // Left side to center
    `L ${headstockStartX} ${headstockTopY + headstockHeight * 0.7}`,
    
    // Left lower curve
    `Q ${headstockStartX + headstockWidth * 0.1} ${headstockBottomY - stringSpacing * 0.3}`,
    `${headstockStartX + headstockWidth * 0.3} ${headstockBottomY}`,
    
    // Bottom edge with slight curve
    `Q ${headstockStartX + headstockWidth * 0.8} ${headstockBottomY + stringSpacing * 0.1}`,
    `${fretboardLeft} ${headstockBottomY - stringSpacing}`,
    
    // Close path along the nut
    `L ${fretboardLeft} ${stringSpacing}`,
    `Z`
  ].join(' ');


  return (
    <g className="guitar-headstock">
      {/* Headstock shadow/depth */}
      <path
        d={headstockPath}
        fill={isDarkMode ? "#3c2415" : "#4a2c17"}
        stroke={isDarkMode ? "#6b4423" : "#5d3419"}
        strokeWidth="1"
        className="transition-colors duration-200"
        transform="translate(-2, 2)"
        opacity="0.4"
      />
      
      {/* Main headstock */}
      <path
        d={headstockPath}
        fill={isDarkMode ? "#5d3a1a" : "#7c4a1e"}
        stroke={isDarkMode ? "#8b5a2b" : "#925a2a"}
        strokeWidth="2"
        className="transition-colors duration-200"
      />
    </g>
  );
};