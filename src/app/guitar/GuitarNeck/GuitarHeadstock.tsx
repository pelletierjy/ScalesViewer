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
  const headstockWidth = stringSpacing * 10; // Make the headstock wider than the neck
  const headstockStartX = fretboardLeft - headstockWidth;
  const headstockHeight = (stringCount - 1) * stringSpacing + stringSpacing * 1.5;
  const headstockTopY = stringSpacing * 0.75; // Start slightly above the first string
  const headstockBottomY = headstockTopY + headstockHeight;
  
  // Define the pointy electric guitar headstock shape - sharp angular design
  const headstockPath = [
    // Start at the nut (neck joint)
    `M ${fretboardLeft} ${stringSpacing}`,
    
    // Sharp angled top edge - pointy design
    `L ${headstockStartX + headstockWidth * 0.6} ${headstockTopY - stringSpacing * 0.2}`,
    `L ${headstockStartX + headstockWidth * 0.2} ${headstockTopY - stringSpacing * 0.5}`,
    
    // Sharp point at the top
    `L ${headstockStartX} ${headstockTopY + headstockHeight * 0.2}`,
    
    // Angled left side - aggressive cutout
    `L ${headstockStartX + headstockWidth * 0.1} ${headstockTopY + headstockHeight * 0.4}`,
    `L ${headstockStartX} ${headstockTopY + headstockHeight * 0.6}`,
    
    // Sharp point at the bottom
    `L ${headstockStartX + headstockWidth * 0.2} ${headstockBottomY + stringSpacing * 0.5}`,
    `L ${headstockStartX + headstockWidth * 0.6} ${headstockBottomY + stringSpacing * 0.2}`,
    
    // Sharp angled bottom edge back to nut
    `L ${fretboardLeft} ${headstockBottomY - stringSpacing}`,
    
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
      
      {/* Tuning Pegs - positioned horizontally along the strings */}
      {Array.from({ length: stringCount }, (_, i) => {
        // For horizontal guitar, pegs should be positioned along each string
        const pegX = headstockStartX + headstockWidth * 0.4;
        const pegY = stringSpacing + (i * stringSpacing);
        
        return (
          <g key={`tuning-peg-${i}`}>
            {/* Tuning peg base */}
            <circle
              cx={pegX}
              cy={pegY}
              r={stringSpacing * 0.15}
              fill={isDarkMode ? "#e5e5e5" : "#d0d0d0"}
              stroke={isDarkMode ? "#b0b0b0" : "#a0a0a0"}
              strokeWidth="1"
              className="transition-colors duration-200"
            />
            {/* Tuning peg button */}
            <circle
              cx={pegX}
              cy={pegY}
              r={stringSpacing * 0.08}
              fill={isDarkMode ? "#2a2a2a" : "#3a3a3a"}
              className="transition-colors duration-200"
            />
          </g>
        );
      })}
    </g>
  );
};