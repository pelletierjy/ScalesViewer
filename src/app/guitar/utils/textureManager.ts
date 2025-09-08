import { generateEnhancedWoodTexture } from './enhancedWoodTextures';

export interface WoodTexture {
  id: string;
  name: string;
  light: string; // Texture data URL for light mode
  dark: string;  // Texture data URL for dark mode
  thumbnail: string;
}

// Lazy load textures to prevent hydration issues
const textureCache = new Map<string, WoodTexture>();

const createWoodTextures = (): WoodTexture[] => {
  // Only generate textures on the client side to prevent hydration issues
  if (typeof window === 'undefined') {
    // Return placeholder data for SSR
    return [
      {
        id: 'pale-ebony',
        name: 'Pale Ebony',
        light: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0U4RTBEMCIvPjwvc3ZnPg==',
        dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJBMjUyMCIvPjwvc3ZnPg==',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0U4RTBEMCIvPjwvc3ZnPg=='
      },
      {
        id: 'black-ebony',
        name: 'Black Ebony',
        light: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJBMkEyQSIvPjwvc3ZnPg==',
        dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBBMEEwQSIvPjwvc3ZnPg==',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJBMkEyQSIvPjwvc3ZnPg=='
      },
      {
        id: 'rosewood',
        name: 'Rosewood',
        light: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzhCNDUxMyIvPjwvc3ZnPg==',
        dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY1NDMyMSIvPjwvc3ZnPg==',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzhCNDUxMyIvPjwvc3ZnPg=='
      },
      {
        id: 'maple',
        name: 'Maple',
        light: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0QyNjkxRSIvPjwvc3ZnPg==',
        dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0EwNzQwQSIvPjwvc3ZnPg==',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0QyNjkxRSIvPjwvc3ZnPg=='
      },
      {
        id: 'pau-ferro',
        name: 'Pau Ferro',
        light: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY1NDMyMSIvPjwvc3ZnPg==',
        dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzRBMzIyMSIvPjwvc3ZnPg==',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY1NDMyMSIvPjwvc3ZnPg=='
      }
    ];
  }

  // Generate real textures on client side
  return [
    {
      id: 'pale-ebony',
      name: 'Pale Ebony',
      light: generateEnhancedWoodTexture('pale-ebony', 'light'),
      dark: generateEnhancedWoodTexture('pale-ebony', 'dark'),
      thumbnail: generateEnhancedWoodTexture('pale-ebony', 'light')
    },
    {
      id: 'black-ebony',
      name: 'Black Ebony',
      light: generateEnhancedWoodTexture('black-ebony', 'light'),
      dark: generateEnhancedWoodTexture('black-ebony', 'dark'),
      thumbnail: generateEnhancedWoodTexture('black-ebony', 'light')
    },
    {
      id: 'rosewood',
      name: 'Rosewood',
      light: generateEnhancedWoodTexture('rosewood', 'light'),
      dark: generateEnhancedWoodTexture('rosewood', 'dark'),
      thumbnail: generateEnhancedWoodTexture('rosewood', 'light')
    },
    {
      id: 'maple',
      name: 'Maple',
      light: generateEnhancedWoodTexture('maple', 'light'),
      dark: generateEnhancedWoodTexture('maple', 'dark'),
      thumbnail: generateEnhancedWoodTexture('maple', 'light')
    },
    {
      id: 'pau-ferro',
      name: 'Pau Ferro',
      light: generateEnhancedWoodTexture('pau-ferro', 'light'),
      dark: generateEnhancedWoodTexture('pau-ferro', 'dark'),
      thumbnail: generateEnhancedWoodTexture('pau-ferro', 'light')
    }
  ];
};

export const woodTextures: WoodTexture[] = createWoodTextures();

export const getCurrentTexture = (textureId: string): WoodTexture =>
  woodTextures.find(t => t.id === textureId) || woodTextures[0];

export const getTextureById = (textureId: string): WoodTexture => {
  const texture = woodTextures.find(t => t.id === textureId);
  return texture || woodTextures[0]; // Default to pale ebony
};

export const preloadWoodTextures = (): void => {
  // Preload all wood texture images for better performance
  const allTextureUrls = woodTextures.flatMap(texture => [
    texture.light,
    texture.dark,
    texture.thumbnail
  ]);

  allTextureUrls.forEach(url => {
    if (url) {
      const img = new Image();
      img.src = url;
    }
  });
};