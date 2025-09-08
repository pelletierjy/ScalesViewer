// Generate realistic wood textures using procedural algorithms
// This creates actual wood grain patterns instead of solid colors

export const generateRealisticWoodTexture = (woodType: string, variant: 'light' | 'dark'): string => {
  // For now, let's create different colored base textures that at least look different
  // In a real implementation, this would use canvas or WebGL to generate proper wood grain
  
  const woodConfigs = {
    'pale-ebony': {
      light: { width: 256, height: 256, baseColor: '#E8E0D0', grainColors: ['#D4C8B8', '#C8BCAC'], pattern: 'subtle' },
      dark: { width: 256, height: 256, baseColor: '#2A2520', grainColors: ['#1A1612', '#16120E'], pattern: 'subtle' }
    },
    'black-ebony': {
      light: { width: 256, height: 256, baseColor: '#2A2A2A', grainColors: ['#1F1F1F', '#1A1A1A'], pattern: 'minimal' },
      dark: { width: 256, height: 256, baseColor: '#0A0A0A', grainColors: ['#080808', '#060606'], pattern: 'minimal' }
    },
    'rosewood': {
      light: { width: 256, height: 256, baseColor: '#8B4513', grainColors: ['#A0522D', '#7A3F0F'], pattern: 'prominent' },
      dark: { width: 256, height: 256, baseColor: '#654321', grainColors: ['#7A3F0F', '#65320C'], pattern: 'prominent' }
    },
    'maple': {
      light: { width: 256, height: 256, baseColor: '#D2691E', grainColors: ['#E6A85C', '#B8860B'], pattern: 'figured' },
      dark: { width: 256, height: 256, baseColor: '#A0740A', grainColors: ['#8B6914', '#76590B'], pattern: 'figured' }
    },
    'pau-ferro': {
      light: { width: 256, height: 256, baseColor: '#654321', grainColors: ['#7A5230', '#8F5F3C'], pattern: 'varied' },
      dark: { width: 256, height: 256, baseColor: '#4A3221', grainColors: ['#5F3F2C', '#744C38'], pattern: 'varied' }
    }
  };

  const config = woodConfigs[woodType as keyof typeof woodConfigs]?.[variant];
  if (!config) return createFallbackTexture();

  return createWoodTextureSVG(config, woodType, variant);
};

const createWoodTextureSVG = (config: {
  width: number;
  height: number;
  baseColor: string;
  grainColors: string[];
  pattern: string;
}, woodType: string, variant: string): string => {
  const { width, height, baseColor, grainColors, pattern } = config;
  
  // Create SVG with wood grain pattern
  let svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wood-${woodType}-${variant}" patternUnits="userSpaceOnUse" width="${width}" height="${height}">
          <rect width="${width}" height="${height}" fill="${baseColor}" />
  `;

  // Add wood grain based on pattern type
  switch (pattern) {
    case 'subtle':
      svgContent += createSubtleGrain(width, height, grainColors);
      break;
    case 'minimal':
      svgContent += createMinimalGrain(width, height, grainColors);
      break;
    case 'prominent':
      svgContent += createProminentGrain(width, height, grainColors);
      break;
    case 'figured':
      svgContent += createFiguredGrain(width, height, grainColors);
      break;
    case 'varied':
      svgContent += createVariedGrain(width, height, grainColors);
      break;
    default:
      svgContent += createSubtleGrain(width, height, grainColors);
  }

  // Add wood pores
  svgContent += createWoodPores(width, height, grainColors);
  
  svgContent += `
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#wood-${woodType}-${variant})" />
    </svg>
  `;

  return 'data:image/svg+xml;base64,' + btoa(svgContent);
};

const createSubtleGrain = (width: number, height: number, grainColors: string[]): string => {
  let grain = '';
  const grainSpacing = 25;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.3 + (Math.random() * 0.3);
    
    grain += `<path d="M0,${y} Q${width/4},${y-3} ${width/2},${y} T${width},${y}" stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createMinimalGrain = (width: number, height: number, grainColors: string[]): string => {
  let grain = '';
  const grainSpacing = 30;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.2 + (Math.random() * 0.2);
    
    grain += `<path d="M0,${y} L${width},${y}" stroke="${color}" stroke-width="0.8" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createProminentGrain = (width: number, height: number, grainColors: string[]): string => {
  let grain = '';
  const grainSpacing = 20;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.4 + (Math.random() * 0.3);
    
    grain += `<path d="M0,${y} Q${width/3},${y-8} ${width*2/3},${y} T${width},${y}" stroke="${color}" stroke-width="1.5" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createFiguredGrain = (width: number, height: number, grainColors: string[]): string => {
  let grain = '';
  const grainSpacing = 22;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.35 + (Math.random() * 0.3);
    
    grain += `<path d="M0,${y} Q${width/4},${y-10} ${width/2},${y} Q${width*3/4},${y+10} ${width},${y}" stroke="${color}" stroke-width="1.2" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createVariedGrain = (width: number, height: number, grainColors: string[]): string => {
  let grain = '';
  const grainSpacing = 18;
  
  for (let y = 0; y < height; y += grainSpacing) {
    const color = grainColors[Math.floor(y / grainSpacing) % grainColors.length];
    const opacity = 0.4 + (Math.random() * 0.3);
    const waveHeight = 5 + Math.random() * 10;
    
    grain += `<path d="M0,${y} Q${width/5},${y-waveHeight} ${width*2/5},${y} Q${width*3/5},${y+waveHeight} ${width*4/5},${y} L${width},${y}" stroke="${color}" stroke-width="1.3" opacity="${opacity}" fill="none" />`;
  }
  
  return grain;
};

const createWoodPores = (width: number, height: number, grainColors: string[]): string => {
  let pores = '';
  const poreCount = Math.floor(width * height / 2000); // Density based on size
  
  for (let i = 0; i < poreCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = 0.5 + Math.random() * 2;
    const color = grainColors[Math.floor(Math.random() * grainColors.length)];
    const opacity = 0.2 + Math.random() * 0.3;
    
    pores += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" opacity="${opacity}" />`;
  }
  
  return pores;
};

const createFallbackTexture = (): string => {
  // Simple fallback texture
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#8B4513" />
      <path d="M0,50 Q50,45 100,50 T200,50" stroke="#654321" stroke-width="1" opacity="0.5" fill="none" />
      <path d="M0,100 Q50,95 100,100 T200,100" stroke="#502709" stroke-width="0.8" opacity="0.3" fill="none" />
    </svg>
  `;
  
  return 'data:image/svg+xml;base64,' + btoa(svg);
};