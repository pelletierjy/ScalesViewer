# GScale Architecture Overview

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── features/             # Feature-specific components
│   ├── guitar/           # Guitar-related components
│   │   ├── Guitar/       # Main guitar component
│   │   ├── GuitarNeck/   # Guitar neck visualization
│   │   └── CustomTuningEditor/ # Custom scaleRoot creation/editing
│   ├── piano/           # Piano-related components
│   │   └── Piano/       # Piano keyboard visualization
│   ├── kalimba/         # Kalimba-related components
│   │   └── Kalimba/     # Kalimba (thumb piano) visualization
│   ├── harmonica/       # Harmonica-related components
│   │   └── Harmonica/   # Diatonic harmonica visualization
│   └── scales/          # Scale-related components
│       └── ScaleSelector/ # Scale and scaleRoot selection UI
├── lib/                  # Shared utilities
│   ├── types/           # TypeScript types
│   │   └── music.ts     # Shared music theory types
│   └── utils/           # Helper functions
       ├── scaleUtils.ts  # Scale calculation and transposition utilities
       ├── scaleConstants.ts # Scale definitions
       └── tuningConstants.ts # Tuning presets
```

## Core Components

### Instrument Visualizations

#### Guitar

- **Guitar**: Container component managing guitar-specific state and controls
- **GuitarNeck**: SVG-based guitar neck visualization with:
  - Variable string count (4-18 strings)
  - Adjustable fret range (12, 20-24 frets)
  - Orientation flipping (horizontal/vertical)
  - Progressive string thickness visualization
  - Base scaleRoot transposition
  - Zero fret note display

#### Piano

- **Piano**: Interactive piano keyboard visualization with:
  - Variable octave count (1-4 octaves)
  - Black and white key distinction
  - Scale-aware note highlighting
  - Octave count controls

#### Kalimba

- **Kalimba**: SVG-based thumb piano visualization with:
  - Traditional 17-key layout
  - Center-outward note arrangement
  - Variable tine lengths
  - Sound hole visualization
  - Scale-aware note highlighting
  - Standard C-major scaleRoot

#### Harmonica

- **Harmonica**: SVG-based diatonic harmonica visualization with:
  - Standard 10-hole diatonic layout
  - Blow and draw note visualization
  - Hole numbering
  - Direction indicators (↑ for blow, ↓ for draw)
  - Scale-aware note highlighting
  - Standard C-major scaleRoot

### Scale Management

- **ScaleSelector**: Unified control panel for:
  - Scale root selection
  - Scale type selection (grouped by categories)
  - Tuning selection with custom scaleRoot support
  - Import/export of custom tunings
  - Base scaleRoot selection

### Shared Features

All instrument visualizations support:

- Dark/light theme
- Scale degree display
- Sharp/flat notation
- Monochrome/color modes
- Root note emphasis

## Data Flow

1. User Input Layer:

   - Scale selection (root + type)
   - Instrument-specific controls
   - Display preferences
   - Theme selection

2. State Management:

   - Local state for UI components
   - LocalStorage for persistence
   - Real-time updates
   - Scale calculations

3. Visualization Layer:
   - SVG-based rendering
   - Dynamic sizing
   - Responsive layout
   - Scale-aware note display

## Technical Implementation

### Scale System

- Comprehensive scale type support
- Note calculation and transposition
- Scale degree determination
- Interval calculations
- Note color mapping

### Rendering Strategy

- SVG for instrument visualization
- Tailwind CSS for styling
- Client-side state management
- LocalStorage for persistence

### Performance Considerations

- Optimized SVG rendering
- Efficient state updates
- Memoized calculations
- Responsive design

### Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- High contrast support

## Future Enhancements

1. **Additional Instruments**

   - Wind instruments
   - String instruments
   - Percussion visualization

2. **Audio Features**

   - Note playback
   - Scale playback
   - Rhythm patterns

3. **Learning Tools**

   - Practice routines
   - Progress tracking
   - Exercise modes

4. **Advanced Features**
   - Scale comparison
   - Chord visualization
   - Theory explanations
   - Custom scale creation
