// Utility to generate SVG-based wood textures as data URLs
// This creates realistic wood grain patterns programmatically

export const generatePaleEbonyTexture = (variant: 'light' | 'dark'): string => {
  const colors = variant === 'light' 
    ? {
        base: '#E8E0D0',
        grain1: '#D4C8B8',
        grain2: '#C8BCAC', 
        grain3: '#BCB0A0',
        accent: '#A09484'
      }
    : {
        base: '#2A2520',
        grain1: '#1A1612',
        grain2: '#16120E',
        grain3: '#120E0A',
        accent: '#0E0A06'
      };

  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wood" patternUnits="userSpaceOnUse" width="200" height="200">
          <rect width="200" height="200" fill="${colors.base}"/ >
          <path d="M0,50 Q50,45 100,50 T200,50" stroke="${colors.grain1}" stroke-width="1.5" opacity="0.7"/ >
          <path d="M0,100 Q50,95 100,100 T200,100" stroke="${colors.grain2}" stroke-width="1" opacity="0.5"/ >
          <path d="M0,150 Q50,145 100,150 T200,150" stroke="${colors.grain3}" stroke-width="0.8" opacity="0.3"/ >
          <circle cx="30" cy="30" r="0.8" fill="${colors.grain2}" opacity="0.3"/ >
          <circle cx="150" cy="80" r="0.6" fill="${colors.grain3}" opacity="0.2"/ >
          <circle cx="170" cy="170" r="1" fill="${colors.grain2}" opacity="0.25"/ >
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#wood)"/ >
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const generateBlackEbonyTexture = (variant: 'light' | 'dark'): string => {
  const colors = variant === 'light'
    ? {
        base: '#2A2A2A',
        grain1: '#1F1F1F',
        grain2: '#1A1A1A',
        grain3: '#151515',
        accent: '#0F0F0F'
      }
    : {
        base: '#0A0A0A',
        grain1: '#080808',
        grain2: '#060606',
        grain3: '#040404',
        accent: '#020202'
      };

  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wood" patternUnits="userSpaceOnUse" width="200" height="200">
          <rect width="200" height="200" fill="${colors.base}"/ >
          <path d="M0,40 Q40,38 80,40 T160,40" stroke="${colors.grain1}" stroke-width="1" opacity="0.6"/ >
          <path d="M0,80 Q40,78 80,80 T160,80" stroke="${colors.grain2}" stroke-width="0.8" opacity="0.4"/ >
          <path d="M0,120 Q40,118 80,120 T160,120" stroke="${colors.grain3}" stroke-width="0.6" opacity="0.3"/ >
          <path d="M0,160 Q40,158 80,160 T160,160" stroke="${colors.accent}" stroke-width="0.5" opacity="0.2"/ >
          <circle cx="50" cy="60" r="0.5" fill="${colors.grain2}" opacity="0.3"/ >
          <circle cx="120" cy="140" r="0.7" fill="${colors.grain3}" opacity="0.2"/ >
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#wood)"/ >
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const generateRosewoodTexture = (variant: 'light' | 'dark'): string => {
  const colors = variant === 'light'
    ? {
        base: '#8B4513',
        grain1: '#A0522D',
        grain2: '#7A3F0F',
        grain3: '#65320C',
        accent: '#502709'
      }
    : {
        base: '#654321',
        grain1: '#7A3F0F',
        grain2: '#65320C',
        grain3: '#502709',
        accent: '#3B1C06'
      };

  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wood" patternUnits="userSpaceOnUse" width="200" height="200">
          <rect width="200" height="200" fill="${colors.base}"/ >
          <path d="M0,35 Q60,32 120,35 T200,35" stroke="${colors.grain1}" stroke-width="2" opacity="0.8"/ >
          <path d="M0,75 Q60,72 120,75 T200,75" stroke="${colors.grain2}" stroke-width="1.5" opacity="0.6"/ >
          <path d="M0,115 Q60,112 120,115 T200,115" stroke="${colors.grain3}" stroke-width="1.2" opacity="0.5"/ >
          <path d="M0,155 Q60,152 120,155 T200,155" stroke="${colors.accent}" stroke-width="1" opacity="0.3"/ >
          <circle cx="40" cy="50" r="0.8" fill="${colors.grain2}" opacity="0.4"/ >
          <circle cx="160" cy="130" r="1.2" fill="${colors.grain3}" opacity="0.3"/ >
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#wood)"/ >
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const generateMapleTexture = (variant: 'light' | 'dark'): string => {
  const colors = variant === 'light'
    ? {
        base: '#D2691E',
        grain1: '#E6A85C',
        grain2: '#B8860B',
        grain3: '#A0740A',
        accent: '#8B6914'
      }
    : {
        base: '#A0740A',
        grain1: '#8B6914',
        grain2: '#76590B',
        grain3: '#614907',
        accent: '#4C3904'
      };

  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wood" patternUnits="userSpaceOnUse" width="200" height="200">
          <rect width="200" height="200" fill="${colors.base}"/ >
          <path d="M0,45 Q70,42 140,45 T200,45" stroke="${colors.grain1}" stroke-width="1.8" opacity="0.7"/ >
          <path d="M0,90 Q70,87 140,90 T200,90" stroke="${colors.grain2}" stroke-width="1.3" opacity="0.5"/ >
          <path d="M0,135 Q70,132 140,135 T200,135" stroke="${colors.grain3}" stroke-width="1" opacity="0.4"/ >
          <circle cx="60" cy="70" r="0.9" fill="${colors.grain2}" opacity="0.3"/ >
          <circle cx="180" cy="110" r="0.6" fill="${colors.grain3}" opacity="0.2"/ >
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#wood)"/ >
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const generatePauFerroTexture = (variant: 'light' | 'dark'): string => {
  const colors = variant === 'light'
    ? {
        base: '#654321',
        grain1: '#7A5230',
        grain2: '#8F5F3C',
        grain3: '#A46C49',
        accent: '#B97955'
      }
    : {
        base: '#4A3221',
        grain1: '#5F3F2C',
        grain2: '#744C38',
        grain3: '#895944',
        accent: '#9E6650'
      };

  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wood" patternUnits="userSpaceOnUse" width="200" height="200">
          <rect width="200" height="200" fill="${colors.base}"/ >
          <path d="M0,38 Q55,35 110,38 T200,38" stroke="${colors.grain1}" stroke-width="1.6" opacity="0.75"/ >
          <path d="M0,78 Q55,75 110,78 T200,78" stroke="${colors.grain2}" stroke-width="1.2" opacity="0.55"/ >
          <path d="M0,118 Q55,115 110,118 T200,118" stroke="${colors.grain3}" stroke-width="0.9" opacity="0.45"/ >
          <path d="M0,158 Q55,155 110,158 T200,158" stroke="${colors.accent}" stroke-width="0.7" opacity="0.3"/ >
          <circle cx="45" cy="65" r="0.7" fill="${colors.grain2}" opacity="0.35"/ >
          <circle cx="155" cy="145" r="1.1" fill="${colors.grain3}" opacity="0.25"/ >
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#wood)"/ >
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Generate thumbnail versions (smaller, simplified)
export const generateWoodThumbnail = (woodType: string): string => {
  const generators = {
    'pale-ebony': generatePaleEbonyTexture,
    'black-ebony': generateBlackEbonyTexture,
    'rosewood': generateRosewoodTexture,
    'maple': generateMapleTexture,
    'pau-ferro': generatePauFerroTexture
  };

  const generator = generators[woodType as keyof typeof generators];
  if (!generator) return generatePaleEbonyTexture('light');

  return generator('light'); // Use light variant for thumbnails
};