// Enhanced wood texture generation with more realistic patterns

interface WoodTextureConfig {
  baseColor: string;
  grainColors: string[];
  pattern: 'subtle' | 'prominent' | 'figured' | 'minimal' | 'varied';
  poreDensity: number;
  grainFrequency: number;
}

const woodConfigs: Record<string, Record<'light' | 'dark', WoodTextureConfig>> = {
  'pale-ebony': {
    light: {
      baseColor: '#E8E0D0',
      grainColors: ['#D4C8B8', '#C8BCAC', '#BCB0A0'],
      pattern: 'subtle',
      poreDensity: 0.3,
      grainFrequency: 0.02
    },
    dark: {
      baseColor: '#2A2520',
      grainColors: ['#1A1612', '#16120E', '#120E0A'],
      pattern: 'subtle',
      poreDensity: 0.3,
      grainFrequency: 0.02
    }
  },
  'black-ebony': {
    light: {
      baseColor: '#2A2A2A',
      grainColors: ['#1F1F1F', '#1A1A1A', '#151515'],
      pattern: 'minimal',
      poreDensity: 0.2,
      grainFrequency: 0.015
    },
    dark: {
      baseColor: '#0A0A0A',
      grainColors: ['#080808', '#060606', '#040404'],
      pattern: 'minimal',
      poreDensity: 0.2,
      grainFrequency: 0.015
    }
  },
  'rosewood': {
    light: {
      baseColor: '#8B4513',
      grainColors: ['#A0522D', '#7A3F0F', '#65320C'],
      pattern: 'prominent',
      poreDensity: 0.5,
      grainFrequency: 0.025
    },
    dark: {
      baseColor: '#654321',
      grainColors: ['#7A3F0F', '#65320C', '#502709'],
      pattern: 'prominent',
      poreDensity: 0.5,
      grainFrequency: 0.025
    }
  },
  'maple': {
    light: {
      baseColor: '#D2691E',
      grainColors: ['#E6A85C', '#B8860B', '#A0740A'],
      pattern: 'figured',
      poreDensity: 0.4,
      grainFrequency: 0.04
    },
    dark: {
      baseColor: '#A0740A',
      grainColors: ['#8B6914', '#76590B', '#614907'],
      pattern: 'figured',
      poreDensity: 0.4,
      grainFrequency: 0.04
    }
  },
  'pau-ferro': {
    light: {
      baseColor: '#654321',
      grainColors: ['#7A5230', '#8F5F3C', '#A46C49'],
      pattern: 'varied',
      poreDensity: 0.45,
      grainFrequency: 0.03
    },
    dark: {
      baseColor: '#4A3221',
      grainColors: ['#5F3F2C', '#744C38', '#895944'],
      pattern: 'varied',
      poreDensity: 0.45,
      grainFrequency: 0.03
    }
  }
};

export const generateEnhancedWoodTexture = (woodType: string, variant: 'light' | 'dark'): string => {
  const config = woodConfigs[woodType]?.[variant];
  if (!config) return createFallbackTexture();

  return createEnhancedSVGTexture(config, woodType, variant);
};

const createEnhancedSVGTexture = (config: WoodTextureConfig, woodType: string, variant: string): string => {
  const { baseColor, grainColors, pattern, poreDensity, grainFrequency } = config;
  const width = 512;
  const height = 512;
  
  let svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wood-${woodType}-${variant}" patternUnits="userSpaceOnUse" width="${width}" height="${height}">
          <rect width="${width}" height="${height}" fill="${baseColor}" />
  `;

  // Add wood grain based on pattern type
  switch (pattern) {
    case 'subtle':
      svgContent += createSubtleGrainPattern(width, height, grainColors, grainFrequency);
      break;
    case 'prominent':
      svgContent += createProminentGrainPattern(width, height, grainColors, grainFrequency);
      break;
    case 'figured':
      svgContent += createFiguredGrainPattern(width, height, grainColors, grainFrequency);
      break;
    case 'minimal':
      svgContent += createMinimalGrainPattern(width, height, grainColors, grainFrequency);
      break;
    case 'varied':
      svgContent += createVariedGrainPattern(width, height, grainColors, grainFrequency);
      break;
    default:
      svgContent += createSubtleGrainPattern(width, height, grainColors, grainFrequency);
  }

  // Add wood pores
  svgContent += createEnhancedWoodPores(width, height, grainColors, poreDensity);
  
  svgContent += `
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#wood-${woodType}-${variant})" />
    </svg>
  `;

  return 'data:image/svg+xml;base64,' + btoa(svgContent);
};

const createSubtleGrainPattern = (width: number, height: number, grainColors: string[], frequency: number): string => {
  let grain = '';
  const grainSpacing = 30;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.25 + (Math.random() * 0.25);
    
    // Create gentle waves
    let path = `M0,${y}`;
    for (let x = 0; x <= width; x += 20) {
      const wave = Math.sin(x * frequency) * 5;
      path += ` L${x},${y + wave}`;
    }
    
    grain += `<path d="${path}" stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createProminentGrainPattern = (width: number, height: number, grainColors: string[], frequency: number): string => {
  let grain = '';
  const grainSpacing = 25;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.4 + (Math.random() * 0.3);
    
    // Create more pronounced waves
    let path = `M0,${y}`;
    for (let x = 0; x <= width; x += 15) {
      const wave1 = Math.sin(x * frequency) * 12;
      const wave2 = Math.sin(x * frequency * 2.5) * 6;
      path += ` L${x},${y + wave1 + wave2}`;
    }
    
    grain += `<path d="${path}" stroke="${color}" stroke-width="1.8" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createFiguredGrainPattern = (width: number, height: number, grainColors: string[], frequency: number): string => {
  let grain = '';
  const grainSpacing = 22;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.3 + (Math.random() * 0.3);
    
    // Create figured/curly pattern
    let path = `M0,${y}`;
    for (let x = 0; x <= width; x += 10) {
      const wave1 = Math.sin(x * frequency) * 15;
      const wave2 = Math.sin(x * frequency * 3 + y * 0.02) * 8;
      const wave3 = Math.sin(x * frequency * 6) * 4;
      path += ` L${x},${y + wave1 + wave2 + wave3}`;
    }
    
    grain += `<path d="${path}" stroke="${color}" stroke-width="1.2" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createMinimalGrainPattern = (width: number, height: number, grainColors: string[], frequency: number): string => {
  let grain = '';
  const grainSpacing = 35;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.15 + (Math.random() * 0.15);
    
    // Create very subtle, almost straight lines
    let path = `M0,${y}`;
    for (let x = 0; x <= width; x += 25) {
      const wave = Math.sin(x * frequency) * 3;
      path += ` L${x},${y + wave}`;
    }
    
    grain += `<path d="${path}" stroke="${color}" stroke-width="0.8" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createVariedGrainPattern = (width: number, height: number, grainColors: string[], frequency: number): string => {
  let grain = '';
  const grainSpacing = 20;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.35 + (Math.random() * 0.25);
    const waveHeight = 8 + Math.random() * 10;
    
    // Create varied wave pattern
    let path = `M0,${y}`;
    for (let x = 0; x <= width; x += 12) {
      const wave1 = Math.sin(x * frequency) * waveHeight;
      const wave2 = Math.sin(x * frequency * 2.2 + Math.random() * 2) * (waveHeight * 0.6);
      path += ` L${x},${y + wave1 + wave2}`;
    }
    
    grain += `<path d="${path}" stroke="${color}" stroke-width="1.4" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createEnhancedWoodPores = (width: number, height: number, grainColors: string[], density: number): string => {
  let pores = '';
  const poreCount = Math.floor(width * height * density / 1000);
  
  for (let i = 0; i < poreCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = 0.5 + Math.random() * 2;
    const color = grainColors[Math.floor(Math.random() * grainColors.length)];
    const opacity = 0.2 + Math.random() * 0.3;
    
    pores += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(1)}" fill="${color}" opacity="${opacity.toFixed(2)}" />`;
  }
  
  return pores;
};

const createFallbackTexture = (): string => {
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#8B4513" />
      <path d="M0,50 Q50,45 100,50 T200,50" stroke="#654321" stroke-width="1" opacity="0.5" fill="none" />
      <path d="M0,100 Q50,95 100,100 T200,100" stroke="#502709" stroke-width="0.8" opacity="0.3" fill="none" />
    </svg>
  `;
  
  return 'data:image/svg+xml;base64,' + btoa(svg);
};

export const createWoodThumbnail = (woodType: string): string => {
  return generateEnhancedWoodTexture(woodType, 'light');
};