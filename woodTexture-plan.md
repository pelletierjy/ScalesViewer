# Guitar Fretboard Wood Texture Implementation Plan (Wood-Only)

## Current Implementation Analysis

The current guitar fretboard uses solid color fills defined by:
- `fretboardColor` state in `src/app/guitar/context.tsx:92` (defaults to `#8B4513` - Rosewood)
- Color picker input in `src/app/guitar/Configuration/Configuration.tsx:248-274`
- SVG rectangles/paths with `fill={fretboardColor}` in:
  - `src/app/guitar/GuitarNeck/GuitarNeck.tsx:195,216` (main fretboard)
  - `src/app/guitar/GuitarNeck/FretboardBackground.tsx:59,86` (background component)

## Simplified Wood-Only Implementation Strategy

### Phase 1: Wood Texture Assets

#### 1.1 Create Wood Texture Directory Structure
```
public/wood-textures/
├── pale-ebony/
│   ├── pale-ebony-light.png    # Light variant for light mode
│   ├── pale-ebony-dark.png     # Dark variant for dark mode
│   └── pale-ebony-thumb.jpg    # Thumbnail for picker
├── black-ebony/
│   ├── black-ebony-light.png   # Light variant (dark gray)
│   ├── black-ebony-dark.png    # Dark variant (pure black)
│   └── black-ebony-thumb.jpg   # Thumbnail for picker
├── rosewood/
│   ├── rosewood-light.png
│   ├── rosewood-dark.png
│   └── rosewood-thumb.jpg
├── maple/
│   ├── maple-light.png
│   ├── maple-dark.png
│   └── maple-thumb.jpg
└── pau-ferro/
    ├── pau-ferro-light.png
    ├── pau-ferro-dark.png
    └── pau-ferro-thumb.jpg
```

#### 1.2 Replace Color System with Texture System
Modify `src/app/guitar/context.tsx`:
- Replace `fretboardColor` with `fretboardTexture` state
- Remove color picker functionality
- Default to 'pale-ebony' texture

### Phase 2: Simplified Texture Manager

#### 2.1 Wood Texture Manager
Create `src/app/guitar/utils/textureManager.ts`:
```tsx
export interface WoodTexture {
  id: string;
  name: string;
  light: string; // PNG path for light mode
  dark: string;  // PNG path for dark mode
  thumbnail: string;
}

export const woodTextures: WoodTexture[] = [
  {
    id: 'pale-ebony',
    name: 'Pale Ebony',
    light: '/wood-textures/pale-ebony/pale-ebony-light.png',
    dark: '/wood-textures/pale-ebony/pale-ebony-dark.png',
    thumbnail: '/wood-textures/pale-ebony/pale-ebony-thumb.jpg'
  },
  {
    id: 'black-ebony',
    name: 'Black Ebony',
    light: '/wood-textures/black-ebony/black-ebony-light.png',
    dark: '/wood-textures/black-ebony/black-ebony-dark.png',
    thumbnail: '/wood-textures/black-ebony/black-ebony-thumb.jpg'
  },
  {
    id: 'rosewood',
    name: 'Rosewood',
    light: '/wood-textures/rosewood/rosewood-light.png',
    dark: '/wood-textures/rosewood/rosewood-dark.png',
    thumbnail: '/wood-textures/rosewood/rosewood-thumb.jpg'
  },
  {
    id: 'maple',
    name: 'Maple',
    light: '/wood-textures/maple/maple-light.png',
    dark: '/wood-textures/maple/maple-dark.png',
    thumbnail: '/wood-textures/maple/maple-thumb.jpg'
  },
  {
    id: 'pau-ferro',
    name: 'Pau Ferro',
    light: '/wood-textures/pau-ferro/pau-ferro-light.png',
    dark: '/wood-textures/pau-ferro/pau-ferro-dark.png',
    thumbnail: '/wood-textures/pau-ferro/pau-ferro-thumb.jpg'
  }
];

export const getCurrentTexture = (textureId: string): WoodTexture =>
  woodTextures.find(t => t.id === textureId) || woodTextures[0];
```

### Phase 3: Pale Ebony & Black Ebony Implementation

#### 3.1 Pale Ebony Color Palette
```tsx
const paleEbonyColors = {
  light: {
    base: '#E8E0D0',     // Light cream base
    grain1: '#D4C8B8',   // First grain layer
    grain2: '#C8BCAC',   // Second grain layer
    grain3: '#BCB0A0',   // Third grain layer
    accent: '#A09484',   // Dark accent
  },
  dark: {
    base: '#2A2520',     // Dark brown base
    grain1: '#1A1612',   // First grain layer
    grain2: '#16120E',   // Second grain layer
    grain3: '#120E0A',   // Third grain layer
    accent: '#0E0A06',   // Darkest accent
  }
};
```

#### 3.2 Black Ebony Color Palette
```tsx
const blackEbonyColors = {
  light: {
    base: '#2A2A2A',     // Dark gray base
    grain1: '#1F1F1F',   // First grain layer
    grain2: '#1A1A1A',   // Second grain layer
    grain3: '#151515',   // Third grain layer
    accent: '#0F0F0F',   // Darkest accent
  },
  dark: {
    base: '#0A0A0A',     // Near black base
    grain1: '#080808',   // First grain layer
    grain2: '#060606',   // Second grain layer
    grain3: '#040404',   // Third grain layer
    accent: '#020202',   // Pure black accent
  }
};
```

#### 3.3 SVG Pattern Generator
Create `src/app/guitar/utils/woodPatternGenerator.ts`:
```tsx
export const generateWoodPattern = (woodType: string, variant: 'light' | 'dark') => {
  const colors = getWoodColors(woodType, variant);
  const patternId = `${woodType}-${variant}`;
  
  return (
    <pattern id={patternId} patternUnits="userSpaceOnUse" width="300" height="300">
      {/* Base wood color */}
      <rect width="300" height="300" fill={colors.base} />
      
      {/* Wood grain lines */}
      <path d="M0,75 Q75,70 150,75 T300,75" stroke={colors.grain1} strokeWidth="2" opacity="0.7" />
      <path d="M0,150 Q75,145 150,150 T300,150" stroke={colors.grain2} strokeWidth="1.5" opacity="0.5" />
      <path d="M0,225 Q75,220 150,225 T300,225" stroke={colors.grain3} strokeWidth="1" opacity="0.3" />
      
      {/* Cross grain for depth */}
      <path d="M75,0 Q70,75 75,150 T75,300" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" />
      <path d="M150,0 Q145,75 150,150 T150,300" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" />
      <path d="M225,0 Q220,75 225,150 T225,300" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" />
      
      {/* Wood pores/speckles */}
      <circle cx="50" cy="50" r="1" fill={colors.grain2} opacity="0.3" />
      <circle cx="150" cy="100" r="0.8" fill={colors.grain3} opacity="0.2" />
      <circle cx="250" cy="200" r="1.2" fill={colors.grain2} opacity="0.25" />
      <circle cx="100" cy="250" r="0.9" fill={colors.grain3} opacity="0.2" />
    </pattern>
  );
};
```

### Phase 4: Texture Component Implementation

#### 4.1 Simplified FretboardTexture Component
Create `src/app/guitar/GuitarNeck/FretboardTexture.tsx`:
```tsx
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
  // ... other props
}) => {
  const texture = getCurrentTexture(textureId);
  const patternId = `wood-pattern-${textureId}-${isDarkMode ? 'dark' : 'light'}`;
  
  return (
    <defs>
      {/* Wood texture pattern */}
      <pattern id={patternId} patternUnits="userSpaceOnUse" width="200" height="200">
        <image 
          href={isDarkMode ? texture.dark : texture.light}
          width="200" 
          height="200"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
      
      {/* Fretboard shape with wood texture */}
      <FretboardShape fill={`url(#${patternId})`} />
    </defs>
  );
};
```

### Phase 5: Configuration UI Updates

#### 5.1 Wood Texture Picker
Replace color picker in `Configuration.tsx`:
```tsx
<div className="grid grid-cols-3 gap-2">
  {woodTextures.map((texture) => (
    <button
      key={texture.id}
      onClick={() => setFretboardTexture(texture.id)}
      className={`relative w-16 h-16 rounded border-2 transition-all ${
        fretboardTexture === texture.id ? 'border-blue-500' : 'border-gray-300'
      }`}
    >
      <img 
        src={texture.thumbnail} 
        alt={texture.name}
        className="w-full h-full object-cover rounded"
      />
      
      <span className="absolute bottom-0 left-0 right-0 text-xs bg-black bg-opacity-50 text-white text-center">
        {texture.name}
      </span>
    </button>
  ))}
</div>
```

### Phase 6: Migration Strategy

#### 6.1 Remove Color References
- Remove `fretboardColor` from context
- Delete color picker component
- Update all components to use texture system
- Default existing users to 'rosewood' (closest to current default)

#### 6.2 Local Storage Migration
```tsx
const migrateFromColorToTexture = () => {
  const oldColor = localStorage.getItem('fretboard-color');
  if (oldColor) {
    // Map old colors to closest wood texture
    const colorToTextureMap = {
      '#8B4513': 'rosewood',
      '#3E2723': 'black-ebony',
      '#D2691E': 'maple',
      '#654321': 'pau-ferro',
      '#2E2E2E': 'black-ebony'
    };
    
    const newTexture = colorToTextureMap[oldColor] || 'rosewood';
    localStorage.setItem('fretboard-texture', newTexture);
    localStorage.removeItem('fretboard-color');
  }
};
```

## Implementation Timeline (Simplified)

### Week 1: Foundation
- Create wood texture PNG assets
- Implement simplified texture manager
- Update data context (remove color system)

### Week 2: Core Components
- Create FretboardTexture component
- Update FretboardBackground component
- Implement wood pattern generator

### Week 3: UI Updates
- Replace color picker with texture grid
- Add pale ebony and black ebony textures
- Test texture rendering

### Week 4: Migration & Polish
- Implement local storage migration
- Remove all color-related code
- Performance optimization and testing

## Technical Benefits of Wood-Only Approach

1. **Simplified Codebase**: No need to handle both colors and textures
2. **Consistent UX**: Always realistic wood appearance
3. **Better Performance**: No color interpolation or fallback logic
4. **Easier Maintenance**: Single texture system to maintain
5. **Enhanced Realism**: Always authentic wood appearance

## Wood Texture Specifications

### PNG Requirements
- **Size**: 200x200px or 400x400px seamless tiles
- **Format**: PNG with transparency support
- **Optimization**: Compressed for web use
- **Variants**: Light and dark mode versions
- **Style**: Realistic wood grain with subtle variation

### Color Palette Guidelines
- **Pale Ebony**: Cream/beige tones with subtle brown grain
- **Black Ebony**: Dark gray to black with subtle dark grain
- **Rosewood**: Traditional reddish-brown with dark grain
- **Maple**: Light golden with subtle figure
- **Pau Ferro**: Medium brown with reddish undertones

## Success Metrics

1. **Visual Quality**: All wood textures look realistic and appealing
2. **Performance**: Fast texture switching with no lag
3. **User Experience**: Intuitive wood selection interface
4. **Code Simplicity**: Clean, maintainable texture-only system
5. **Accessibility**: High contrast between fretboard and components