import React from 'react';

interface FretboardTextureProps {
  texture: string;
}

const TEXTURE_MAP = {
  'rosewood': 'rosewood-grain',
  'ebony': 'ebony-grain', 
  'maple': 'maple-grain',
  'pau-ferro': 'pau-ferro-grain',
  'richlite': 'richlite-grain'
};

// Embedded SVG patterns to avoid hydration issues
const TEXTURE_PATTERNS = {
  'rosewood': (
    <pattern id="rosewood-grain" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
      <rect width="200" height="100" fill="#8B4513"/>
      <path d="M0,20 Q50,15 100,25 T200,20" stroke="#5D2F0A" strokeWidth="2" fill="none" opacity="0.7"/>
      <path d="M0,45 Q40,40 80,50 Q120,55 160,45 Q180,42 200,48" stroke="#5D2F0A" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M0,70 Q60,65 120,75 T200,70" stroke="#5D2F0A" strokeWidth="1.8" fill="none" opacity="0.5"/>
      <path d="M0,35 Q45,30 90,40 T200,35" stroke="#A0522D" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M0,60 Q55,55 110,65 T200,60" stroke="#A0522D" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M20,0 Q25,25 30,50 Q35,75 40,100" stroke="#5D2F0A" strokeWidth="0.5" fill="none" opacity="0.3"/>
      <path d="M80,0 Q85,30 90,60 Q95,90 100,100" stroke="#5D2F0A" strokeWidth="0.6" fill="none" opacity="0.3"/>
      <path d="M140,0 Q145,20 150,40 Q155,60 160,100" stroke="#5D2F0A" strokeWidth="0.4" fill="none" opacity="0.3"/>
      <circle cx="30" cy="25" r="0.5" fill="#5D2F0A" opacity="0.4"/>
      <circle cx="75" cy="55" r="0.3" fill="#5D2F0A" opacity="0.3"/>
      <circle cx="125" cy="35" r="0.4" fill="#5D2F0A" opacity="0.3"/>
      <circle cx="170" cy="65" r="0.3" fill="#5D2F0A" opacity="0.4"/>
    </pattern>
  ),
  
  'ebony': (
    <pattern id="ebony-grain" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
      <rect width="200" height="100" fill="#3E2723"/>
      <path d="M0,25 Q50,20 100,30 T200,25" stroke="#1A0A08" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M0,50 Q60,45 120,55 T200,50" stroke="#1A0A08" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M0,75 Q40,70 80,80 Q120,85 160,75 Q180,72 200,78" stroke="#1A0A08" strokeWidth="1.3" fill="none" opacity="0.4"/>
      <path d="M0,15 Q45,10 90,20 T200,15" stroke="#4E342E" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M0,65 Q55,60 110,70 T200,65" stroke="#4E342E" strokeWidth="0.6" fill="none" opacity="0.2"/>
      <path d="M25,0 Q30,25 35,50 Q40,75 45,100" stroke="#1A0A08" strokeWidth="0.3" fill="none" opacity="0.2"/>
      <path d="M90,0 Q95,30 100,60 Q105,90 110,100" stroke="#1A0A08" strokeWidth="0.4" fill="none" opacity="0.2"/>
      <path d="M155,0 Q160,20 165,40 Q170,60 175,100" stroke="#1A0A08" strokeWidth="0.3" fill="none" opacity="0.2"/>
      <circle cx="40" cy="30" r="0.2" fill="#1A0A08" opacity="0.3"/>
      <circle cx="85" cy="60" r="0.2" fill="#1A0A08" opacity="0.2"/>
      <circle cx="135" cy="40" r="0.2" fill="#1A0A08" opacity="0.3"/>
      <circle cx="180" cy="70" r="0.2" fill="#1A0A08" opacity="0.2"/>
    </pattern>
  ),
  
  'maple': (
    <pattern id="maple-grain" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
      <rect width="200" height="100" fill="#D2691E"/>
      <path d="M0,20 Q50,15 100,25 T200,20" stroke="#B8860B" strokeWidth="2.5" fill="none" opacity="0.8"/>
      <path d="M0,40 Q40,35 80,45 Q120,50 160,40 Q180,37 200,43" stroke="#B8860B" strokeWidth="2" fill="none" opacity="0.7"/>
      <path d="M0,65 Q60,60 120,70 T200,65" stroke="#B8860B" strokeWidth="2.2" fill="none" opacity="0.6"/>
      <path d="M0,85 Q45,80 90,90 T200,85" stroke="#B8860B" strokeWidth="1.8" fill="none" opacity="0.5"/>
      <path d="M0,30 Q45,25 90,35 T200,30" stroke="#F4A460" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M0,55 Q55,50 110,60 T200,55" stroke="#F4A460" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M0,75 Q50,70 100,80 T200,75" stroke="#F4A460" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M30,0 Q35,25 40,50 Q45,75 50,100" stroke="#B8860B" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M75,0 Q80,30 85,60 Q90,90 95,100" stroke="#B8860B" strokeWidth="0.9" fill="none" opacity="0.4"/>
      <path d="M120,0 Q125,20 130,40 Q135,60 140,100" stroke="#B8860B" strokeWidth="0.7" fill="none" opacity="0.4"/>
      <path d="M165,0 Q170,35 175,70 Q180,85 185,100" stroke="#B8860B" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <circle cx="25" cy="22" r="0.4" fill="#B8860B" opacity="0.5"/>
      <circle cx="70" cy="48" r="0.5" fill="#B8860B" opacity="0.4"/>
      <circle cx="115" cy="32" r="0.4" fill="#B8860B" opacity="0.5"/>
      <circle cx="160" cy="68" r="0.5" fill="#B8860B" opacity="0.4"/>
      <circle cx="45" cy="78" r="0.3" fill="#B8860B" opacity="0.4"/>
      <circle cx="135" cy="88" r="0.4" fill="#B8860B" opacity="0.5"/>
    </pattern>
  ),
  
  'pau-ferro': (
    <pattern id="pau-ferro-grain" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
      <rect width="200" height="100" fill="#654321"/>
      <path d="M0,18 Q50,15 100,22 T200,18" stroke="#4A2C17" strokeWidth="1.8" fill="none" opacity="0.7"/>
      <path d="M0,35 Q40,30 80,38 Q120,42 160,35 Q180,33 200,38" stroke="#4A2C17" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M0,52 Q60,47 120,57 T200,52" stroke="#4A2C17" strokeWidth="1.6" fill="none" opacity="0.6"/>
      <path d="M0,70 Q45,65 90,75 T200,70" stroke="#4A2C17" strokeWidth="1.4" fill="none" opacity="0.5"/>
      <path d="M0,87 Q55,82 110,92 T200,87" stroke="#4A2C17" strokeWidth="1.3" fill="none" opacity="0.5"/>
      <path d="M0,25 Q45,20 90,30 T200,25" stroke="#8B6914" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M0,43 Q55,38 110,48 T200,43" stroke="#8B6914" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M0,62 Q40,57 80,67 Q120,72 160,62 Q180,59 200,65" stroke="#8B6914" strokeWidth="0.9" fill="none" opacity="0.3"/>
      <path d="M0,80 Q50,75 100,85 T200,80" stroke="#8B6914" strokeWidth="0.7" fill="none" opacity="0.3"/>
      <path d="M20,0 Q25,25 30,50 Q35,75 40,100" stroke="#4A2C17" strokeWidth="0.4" fill="none" opacity="0.3"/>
      <path d="M65,0 Q70,30 75,60 Q80,90 85,100" stroke="#4A2C17" strokeWidth="0.5" fill="none" opacity="0.3"/>
      <path d="M110,0 Q115,20 120,40 Q125,60 130,100" stroke="#4A2C17" strokeWidth="0.4" fill="none" opacity="0.3"/>
      <path d="M155,0 Q160,35 165,70 Q170,85 175,100" stroke="#4A2C17" strokeWidth="0.5" fill="none" opacity="0.3"/>
      <circle cx="35" cy="28" r="0.3" fill="#4A2C17" opacity="0.4"/>
      <circle cx="78" cy="55" r="0.2" fill="#4A2C17" opacity="0.3"/>
      <circle cx="125" cy="38" r="0.3" fill="#4A2C17" opacity="0.4"/>
      <circle cx="168" cy="72" r="0.2" fill="#4A2C17" opacity="0.3"/>
      <circle cx="52" cy="83" r="0.3" fill="#4A2C17" opacity="0.4"/>
    </pattern>
  ),
  
  'richlite': (
    <pattern id="richlite-grain" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
      <rect width="200" height="100" fill="#2E2E2E"/>
      <path d="M0,20 Q50,18 100,22 T200,20" stroke="#1A1A1A" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M0,40 Q40,38 80,42 Q120,44 160,40 Q180,39 200,42" stroke="#1A1A1A" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M0,60 Q60,58 120,62 T200,60" stroke="#1A1A1A" strokeWidth="1.1" fill="none" opacity="0.4"/>
      <path d="M0,80 Q45,78 90,82 T200,80" stroke="#1A1A1A" strokeWidth="0.9" fill="none" opacity="0.3"/>
      <path d="M0,30 Q45,28 90,32 T200,30" stroke="#3E3E3E" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M0,50 Q55,48 110,52 T200,50" stroke="#3E3E3E" strokeWidth="0.6" fill="none" opacity="0.3"/>
      <path d="M0,70 Q40,68 80,72 Q120,74 160,70 Q180,69 200,72" stroke="#3E3E3E" strokeWidth="0.7" fill="none" opacity="0.3"/>
      <path d="M25,0 Q27,25 29,50 Q31,75 33,100" stroke="#1A1A1A" strokeWidth="0.3" fill="none" opacity="0.2"/>
      <path d="M75,0 Q77,30 79,60 Q81,90 83,100" stroke="#1A1A1A" strokeWidth="0.3" fill="none" opacity="0.2"/>
      <path d="M125,0 Q127,20 129,40 Q131,60 133,100" stroke="#1A1A1A" strokeWidth="0.3" fill="none" opacity="0.2"/>
      <path d="M175,0 Q177,35 179,70 Q181,85 183,100" stroke="#1A1A1A" strokeWidth="0.3" fill="none" opacity="0.2"/>
      <ellipse cx="40" cy="25" rx="1" ry="0.3" fill="#3E3E3E" opacity="0.3" transform="rotate(15 40 25)"/>
      <ellipse cx="85" cy="45" rx="0.8" ry="0.3" fill="#3E3E3E" opacity="0.2" transform="rotate(-20 85 45)"/>
      <ellipse cx="130" cy="35" rx="1.2" ry="0.4" fill="#3E3E3E" opacity="0.3" transform="rotate(30 130 35)"/>
      <ellipse cx="175" cy="65" rx="0.9" ry="0.3" fill="#3E3E3E" opacity="0.2" transform="rotate(-10 175 65)"/>
      <ellipse cx="60" cy="75" rx="1" ry="0.3" fill="#3E3E3E" opacity="0.3" transform="rotate(25 60 75)"/>
      <circle cx="15" cy="35" r="0.2" fill="#3E3E3E" opacity="0.2"/>
      <circle cx="65" cy="15" r="0.15" fill="#3E3E3E" opacity="0.2"/>
      <circle cx="115" cy="55" r="0.2" fill="#3E3E3E" opacity="0.2"/>
      <circle cx="165" cy="25" r="0.15" fill="#3E3E3E" opacity="0.2"/>
      <circle cx="45" cy="85" r="0.2" fill="#3E3E3E" opacity="0.2"/>
    </pattern>
  )
};

export const FretboardTexture: React.FC<FretboardTextureProps> = ({ texture }) => {
  const pattern = TEXTURE_PATTERNS[texture as keyof typeof TEXTURE_PATTERNS];
  
  if (!pattern) {
    // Fallback pattern for unknown textures
    return (
      <pattern id={`${texture}-fallback`} x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
        <rect width="200" height="100" fill="#8B4513"/>
      </pattern>
    );
  }

  return pattern;
};

export const getTexturePatternUrl = (texture: string): string => {
  const fileName = texture.toLowerCase();
  const textureKey = fileName.replace('-', '-') as keyof typeof TEXTURE_MAP;
  const patternId = TEXTURE_MAP[textureKey] || `${fileName}-grain`;
  return `url(#${patternId})`;
};