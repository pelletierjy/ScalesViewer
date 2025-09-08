import { generateEnhancedWoodTexture } from './enhancedWoodTextures';

export interface WoodTexture {
  id: string;
  name: string;
  light: string; // Texture data URL for light mode
  dark: string;  // Texture data URL for dark mode
  thumbnail: string;
}

export const woodTextures: WoodTexture[] = [
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