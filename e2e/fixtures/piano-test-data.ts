export const scaleTestData = {
  // Common scales for testing
  scales: [
    'Major',
    'Minor',
    'Dorian',
    'Mixolydian',
    'Pentatonic Major',
    'Pentatonic Minor',
    'Blues',
    'Harmonic Minor',
    'Melodic Minor'
  ],
  
  // Root notes for testing
  rootNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  
  // Expected note counts for different octave settings
  octaveKeyCounts: {
    1: { white: 7, black: 5, total: 12 },
    2: { white: 14, black: 10, total: 24 },
    3: { white: 21, black: 15, total: 36 },
    4: { white: 28, black: 20, total: 48 }
  },
  
  // Major scale intervals for testing
  majorScaleNotes: {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
  },

  // Minor scale patterns
  minorScaleNotes: {
    'A': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    'E': ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
    'D': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    'G': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F']
  },

  // Pentatonic scales
  pentatonicMajorNotes: {
    'C': ['C', 'D', 'E', 'G', 'A'],
    'G': ['G', 'A', 'B', 'D', 'E'],
    'F': ['F', 'G', 'A', 'C', 'D']
  },

  pentatonicMinorNotes: {
    'A': ['A', 'C', 'D', 'E', 'G'],
    'E': ['E', 'G', 'A', 'B', 'D'],
    'D': ['D', 'F', 'G', 'A', 'C']
  },

  // Blues scale patterns
  bluesScaleNotes: {
    'C': ['C', 'Eb', 'F', 'F#', 'G', 'Bb'],
    'G': ['G', 'Bb', 'C', 'C#', 'D', 'F'],
    'E': ['E', 'G', 'A', 'A#', 'B', 'D']
  },
  
  // Theme test configurations
  themes: ['light', 'dark'] as const,
  
  // Viewport sizes for responsive testing
  viewports: [
    { name: 'mobile-portrait', width: 375, height: 667 },
    { name: 'mobile-landscape', width: 667, height: 375 },
    { name: 'tablet-portrait', width: 768, height: 1024 },
    { name: 'tablet-landscape', width: 1024, height: 768 },
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'ultra-wide', width: 3440, height: 1440 }
  ],

  // Performance test data
  performanceScenarios: [
    { name: 'minimal', octaves: 1, scale: 'Pentatonic Major' },
    { name: 'standard', octaves: 2, scale: 'Major' },
    { name: 'extended', octaves: 3, scale: 'Harmonic Minor' },
    { name: 'maximum', octaves: 4, scale: 'Chromatic' }
  ]
};

export const pianoTestScenarios = {
  // Basic functionality tests
  basic: [
    {
      name: 'Default state',
      scale: 'Major',
      rootNote: 'C',
      octaves: 2,
      showFlats: false,
      showDegrees: false,
      theme: 'light' as const
    },
    {
      name: 'Minor scale with flats',
      scale: 'Minor',
      rootNote: 'F',
      octaves: 3,
      showFlats: true,
      showDegrees: false,
      theme: 'light' as const
    },
    {
      name: 'Blues scale with degrees',
      scale: 'Blues',
      rootNote: 'G',
      octaves: 4,
      showFlats: false,
      showDegrees: true,
      theme: 'dark' as const
    }
  ],
  
  // Performance test scenarios
  performance: [
    {
      name: 'Maximum octaves',
      scale: 'Chromatic',
      rootNote: 'C',
      octaves: 4,
      showFlats: false,
      showDegrees: false,
      theme: 'light' as const
    }
  ],

  // Accessibility test scenarios
  accessibility: [
    {
      name: 'High contrast mode',
      scale: 'Major',
      rootNote: 'C',
      octaves: 2,
      showFlats: false,
      showDegrees: true,
      theme: 'dark' as const
    }
  ]
};

export const audioTestData = {
  // Note frequencies for validation (in Hz)
  noteFrequencies: {
    'C4': 261.63,
    'C#4': 277.18,
    'D4': 293.66,
    'D#4': 311.13,
    'E4': 329.63,
    'F4': 349.23,
    'F#4': 369.99,
    'G4': 392.00,
    'G#4': 415.30,
    'A4': 440.00,
    'A#4': 466.16,
    'B4': 493.88
  },

  // Audio test patterns
  testPatterns: [
    {
      name: 'single-note',
      notes: ['C'],
      expected: ['C4']
    },
    {
      name: 'major-chord',
      notes: ['C', 'E', 'G'],
      expected: ['C4', 'E4', 'G4']
    },
    {
      name: 'scale-run',
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
      expected: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
    }
  ]
};

export const validationRules = {
  // Piano key count validation
  validateKeyCount: (octaves: number, keyType: 'white' | 'black' | 'total'): number => {
    const countsPerOctave = { white: 7, black: 5, total: 12 };
    return countsPerOctave[keyType] * octaves;
  },

  // Scale pattern validation
  validateScalePattern: (scale: string, rootNote: string): string[] => {
    const scalePatterns: { [key: string]: number[] } = {
      'Major': [0, 2, 4, 5, 7, 9, 11],
      'Minor': [0, 2, 3, 5, 7, 8, 10],
      'Dorian': [0, 2, 3, 5, 7, 9, 10],
      'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
      'Pentatonic Major': [0, 2, 4, 7, 9],
      'Pentatonic Minor': [0, 3, 5, 7, 10],
      'Blues': [0, 3, 5, 6, 7, 10]
    };

    const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = chromatic.indexOf(rootNote);
    const pattern = scalePatterns[scale] || scalePatterns['Major'];

    return pattern.map(interval => chromatic[(rootIndex + interval) % 12]);
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: { min: 320, max: 767 },
    tablet: { min: 768, max: 1023 },
    desktop: { min: 1024, max: 1919 },
    ultraWide: { min: 1920, max: 3840 }
  },

  // Theme validation
  validateTheme: (theme: 'light' | 'dark') => ({
    expectedClasses: theme === 'dark' ? ['dark'] : [],
    expectedColors: theme === 'dark' 
      ? { background: '#1f2937', text: '#f9fafb' }
      : { background: '#ffffff', text: '#111827' }
  })
};