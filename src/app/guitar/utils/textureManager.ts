export interface WoodTexture {
  id: string;
  name: string;
  light: string; // Texture URL for light mode (can be image URL or data URL)
  dark: string;  // Texture URL for dark mode (can be image URL or data URL)
  thumbnail: string;
}

const createWoodTextures = (): WoodTexture[] => {
  // Only load textures on the client side to prevent hydration issues
  if (typeof window === 'undefined') {
    // Return placeholder data for SSR
    return [
      {
        id: 'pale-ebony',
        name: 'Pale Ebony',
        light: '/wood-textures/pale-ebony-light.svg',
        dark: '/wood-textures/pale-ebony-dark.svg',
        thumbnail: '/wood-textures/pale-ebony-light.svg'
      },
      {
        id: 'black-ebony',
        name: 'Black Ebony',
        light: '/wood-textures/black-ebony-light.svg',
        dark: '/wood-textures/black-ebony-dark.svg',
        thumbnail: '/wood-textures/black-ebony-light.svg'
      },
      {
        id: 'rosewood',
        name: 'Rosewood',
        light: '/wood-textures/rosewood-light.svg',
        dark: '/wood-textures/rosewood-dark.svg',
        thumbnail: '/wood-textures/rosewood-light.svg'
      },
      {
        id: 'maple',
        name: 'Maple',
        light: '/wood-textures/maple-light.svg',
        dark: '/wood-textures/maple-dark.svg',
        thumbnail: '/wood-textures/maple-light.svg'
      },
      {
        id: 'pau-ferro',
        name: 'Pau Ferro',
        light: '/wood-textures/pau-ferro-light.svg',
        dark: '/wood-textures/pau-ferro-dark.svg',
        thumbnail: '/wood-textures/pau-ferro-light.svg'
      },
      {
        id: 'pale-moon-ebony',
        name: 'Pale Moon Ebony',
        light: '/wood-textures/pale-moon-ebony-light.svg',
        dark: '/wood-textures/pale-moon-ebony-dark.svg',
        thumbnail: '/wood-textures/pale-moon-ebony-light.svg'
      }
    ];
  }

  // Use real wood texture images on client side
  return [
    {
      id: 'pale-ebony',
      name: 'Pale Ebony',
      light: '/wood-textures/pale-ebony-light.svg',
      dark: '/wood-textures/pale-ebony-dark.svg',
      thumbnail: '/wood-textures/pale-ebony-light.svg'
    },
    {
      id: 'black-ebony',
      name: 'Black Ebony',
      light: '/wood-textures/black-ebony-light.svg',
      dark: '/wood-textures/black-ebony-dark.svg',
      thumbnail: '/wood-textures/black-ebony-light.svg'
    },
    {
      id: 'rosewood',
      name: 'Rosewood',
      light: '/wood-textures/rosewood-light.svg',
      dark: '/wood-textures/rosewood-dark.svg',
      thumbnail: '/wood-textures/rosewood-light.svg'
    },
    {
      id: 'maple',
      name: 'Maple',
      light: '/wood-textures/maple-light.svg',
      dark: '/wood-textures/maple-dark.svg',
      thumbnail: '/wood-textures/maple-light.svg'
    },
    {
      id: 'pau-ferro',
      name: 'Pau Ferro',
      light: '/wood-textures/pau-ferro-light.svg',
      dark: '/wood-textures/pau-ferro-dark.svg',
      thumbnail: '/wood-textures/pau-ferro-light.svg'
    },
    {
      id: 'pale-moon-ebony',
      name: 'Pale Moon Ebony',
      light: '/wood-textures/pale-moon-ebony-light.svg',
      dark: '/wood-textures/pale-moon-ebony-dark.svg',
      thumbnail: '/wood-textures/pale-moon-ebony-light.svg'
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