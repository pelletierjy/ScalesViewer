import { generateRealisticWoodTexture } from './generateRealisticTextures';

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
    light: generateRealisticWoodTexture('pale-ebony', 'light'),
    dark: generateRealisticWoodTexture('pale-ebony', 'dark'),
    thumbnail: generateRealisticWoodTexture('pale-ebony', 'light')
  },
  {
    id: 'black-ebony',
    name: 'Black Ebony',
    light: generateRealisticWoodTexture('black-ebony', 'light'),
    dark: generateRealisticWoodTexture('black-ebony', 'dark'),
    thumbnail: generateRealisticWoodTexture('black-ebony', 'light')
  },
  {
    id: 'rosewood',
    name: 'Rosewood',
    light: generateRealisticWoodTexture('rosewood', 'light'),
    dark: generateRealisticWoodTexture('rosewood', 'dark'),
    thumbnail: generateRealisticWoodTexture('rosewood', 'light')
  },
  {
    id: 'maple',
    name: 'Maple',
    light: generateRealisticWoodTexture('maple', 'light'),
    dark: generateRealisticWoodTexture('maple', 'dark'),
    thumbnail: generateRealisticWoodTexture('maple', 'light')
  },
  {
    id: 'pau-ferro',
    name: 'Pau Ferro',
    light: generateRealisticWoodTexture('pau-ferro', 'light'),
    dark: generateRealisticWoodTexture('pau-ferro', 'dark'),
    thumbnail: generateRealisticWoodTexture('pau-ferro', 'light')
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