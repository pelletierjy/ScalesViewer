# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
```bash
# Start development server with Turbopack
npm run dev

# Run tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run a single test file
npm test -- src/__tests__/CustomTuningEditor.test.tsx

# Lint the codebase
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Mobile Development (Capacitor)
```bash
# Build for mobile
npm run build-mobile

# Sync with Capacitor
npm run cap-sync

# Open Android Studio
npm run android

# Build and open Android
npm run android-build
```

## Architecture Overview

### State Management
The application uses a hybrid approach to state management for learning purposes:
- **Redux Store** (`src/app/store.ts`): Manages global configuration state with persistence middleware
  - `globalConfig`: Dark mode, instrument selection, scale settings, display preferences
  - `applicationState`: Application initialization tracking
- **Guitar Page**: Uses React Context API and local state (intentionally not using Redux)
- **Piano Page**: Uses React Context to avoid prop drilling (intentionally not using Redux)
- **Persistence**: Redux middleware saves to localStorage after initialization completes

### Key Architectural Patterns

1. **Instrument Pages** (`src/app/[instrument]/page.tsx`):
   - Each instrument has its own page under Next.js app router
   - Instruments: guitar, piano, kalimba, harmonica
   - Each implements different state management approaches intentionally

2. **Feature Organization** (`src/features/`):
   - Components organized by feature/instrument
   - Each feature contains its visualization components and logic

3. **Shared Utilities** (`src/lib/utils/`):
   - `scaleUtils.ts`: Core scale calculations, transposition, and note generation
   - `scaleConstants.ts`: Comprehensive scale definitions (60+ scales)
   - `note.ts`: Note naming, frequency calculations, enharmonic handling
   - `audioUtils.ts`: Audio context and playback utilities

4. **Guitar-Specific Architecture**:
   - Custom tuning system with import/export functionality
   - SVG-based fretboard visualization with dynamic sizing
   - Supports 4-18 strings and various fret counts
   - Base tuning transposition feature

### Component Patterns

- **Visualization Components**: Use SVG for scalable instrument rendering
- **State Hooks**: Custom hooks for complex state logic
- **Theme Support**: All components support dark/light themes via Tailwind
- **Responsive Design**: Mobile-first approach with breakpoint considerations

### Testing Strategy
- Jest with React Testing Library
- Test files in `src/__tests__/`
- Components wrapped in test providers for Redux/Context
- Focus on user interactions and rendered output

### Important Implementation Details

1. **Scale System**:
   - Zero-based array indexing for internal calculations
   - One-based numbering for user-facing fret numbers
   - Sharps preferred in note naming (configurable to flats)
   - Scale degrees calculated relative to root note

2. **Guitar Neck Component Architecture**:
   - **GuitarNeck** (`src/app/guitar/GuitarNeck/GuitarNeck.tsx`): Main container component
     - Manages SVG viewport and responsive sizing
     - Calculates string spacing based on string count
     - Handles base tuning transposition via `getAdjustedTuning`
     - Orchestrates child components for rendering
   - **Component Hierarchy**:
     - `FretMarkers`: Renders fret position dots (single and double at 12th fret)
     - `StringGroup`: Container for all strings and their notes
       - `Strings`: Renders string lines with progressive thickness
       - `NotesDisplay`: Manages note rendering for each string
         - Zero fret notes (open strings)
         - `FrettedNotes`: Renders notes on frets 1-24
     - `FretNumbers`: Displays fret numbers below the neck
   - **Key Features**:
     - Dynamic height adjustment based on string count
     - Fret positions calculated using logarithmic scale (`getFretPositions`)
     - Note octave calculation considers string position and fret number
     - Click-to-play functionality via `audioUtils`
     - Flip orientation support (X and Y axis)

3. **Note Rendering System**:
   - Each note is an SVG group with a circle and text
   - Only scale notes are displayed (non-scale notes hidden)
   - Note colors determined by `getNoteColor` based on scale degree
   - Zero fret (open string) notes displayed separately
   - Text can show note names, flats, or scale degrees
   - Full octave information calculated for audio playback

4. **State Management in Guitar Page**:
   - Uses React Context (`DataContext`) for guitar-specific state
   - Local storage persistence for:
     - Custom tunings
     - Current tuning selection
     - Fret count, flip states, base tuning
   - Intentionally does not use Redux (learning exercise)

### Development Rules (from docs/rules/development.md)

- Strict TypeScript typing required
- Functional components with hooks only
- Tailwind CSS for all styling
- Dark/light theme support mandatory
- Mobile-first responsive design
- No `any` types unless absolutely necessary
- Props interfaces at top of component files
- SVG-based visualizations for instruments