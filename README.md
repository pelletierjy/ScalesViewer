# GScale - Musical Scale Visualization Tool

A modern desktop application built with Next.js that helps musicians visualize scales across multiple instruments.
The application provides interactive visualizations for guitar, piano, flute, and kalimba.

## Technical notes

- The app is designed mainly as a learning React/NextJS platform which explain some inconsistency where I used different technics or over architectures parts for experimentation and documentation purposes.
- Redux is used to manage the state
  - The root store handles persisting the state to the local storage on changes after initialization phase has completed
  - The guitar page uses a local states and local persistency (not using store on purpose).
  - The piano page uses data context and local persistency to avoid props drilling (not using store on purpose).
- It is still in development, so some area still need improvements.

## Features

- Multi-instrument scale visualization:
  - Interactive guitar neck with customizable tunings
  - Piano keyboard with adjustable octave count
  - Flute fingering chart
  - Kalimba (thumb piano) with traditional 17-key layout
- Support for extensive scale types:
  - Common Scales (Major, Minor, Pentatonic, Blues)
  - Jazz Scales (Bebop, Diminished, Whole-tone, Altered)
  - Modes (Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian)
  - Modal Variants (Lydian Dominant, Super Locrian, Melodic Minor, Harmonic Minor)
  - Exotic Scales (Hungarian Minor, Ukrainian Dorian, Persian, Byzantine, Japanese)
  - Symmetric Scales (Chromatic, Diminished)
  - Pentatonic Variants (Minor Pentatonic, Egyptian, Chinese, Japanese Pentatonic)
- Advanced visualization options:
  - Dark/Light theme support
  - Scale degree display
  - Sharp/Flat notation toggle
  - Monochrome/Color modes
  - Instrument-specific features:
    - Guitar: Custom scaleRoot editor, variable fret count, orientation flipping
    - Piano: Adjustable octave count (1-4 octaves)
    - Flute: Standard fingering chart with scale highlighting
    - Kalimba: Traditional 17-key layout with center-outward note arrangement
- Responsive design that works on all screen sizes
- Native desktop application for Windows

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Development**: Turbopack
- **State Management**: React Hooks

## Getting Started

1. Clone the repository:

   ```bash
   git clone [your-repo-url]
   cd gscale
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   # For web development
   npm run dev
   ```

## Building the Application

### Web Build

```bash
npm run build
```

## Development

### Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # Shared UI components
├── features/             # Feature-specific components
│   ├── guitar/           # Guitar-related components
│   └── scales/           # Scale-related components
│   └── ...
├── lib/                  # Shared utilities
│   ├── types/           # TypeScript types
│   └── utils/           # Helper functions
└── styles/              # Global styles

assets/                 # Application assets (icons, etc.)
```

### Development Modes

- **Web Development**: `npm run dev`

  - Runs Next.js development server
  - Hot reloading enabled
  - Access via http://localhost:3000

### Building for Production

#### Web Production Build

```bash
npm run build
```

#### Desktop Production Build

```bash
# Clean build directories and create production build
npm run build-prepare
```

### Windows-Specific Notes

- Requires Node.js 18+ and npm 8+
- Windows Build Tools might be required:
  ```bash
  npm install --global windows-build-tools
  ```
- Enable Windows Developer Mode for symlink support
- Run as administrator if encountering permission issues

## Contributing

1. Create a new feature branch from `main`
2. Make your changes
3. Submit a pull request

## Troubleshooting

### Common Build Issues

1. **Symlink Errors**

   - Enable Developer Mode in Windows
   - Run terminal as Administrator

2. **Permission Errors**

   - Clear the build directories:
     ```bash
     npm run build-prepare
     ```
   - Run as Administrator

3. **Module Not Found**
   - Clear npm cache:
     ```bash
     npm cache clean --force
     ```
   - Reinstall dependencies:
     ```bash
     rm -rf node_modules
     npm install
     ```

## Testing

This project uses Jest and React Testing Library for testing. Here's how to run the tests:

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

- Tests are located in the `src/__tests__` directory
- Each test file should follow the naming convention: `*.test.tsx` or `*.test.ts`
- Component tests should be placed in the same directory as the component they test

### Writing Tests

Example of a simple component test:

```tsx
import { render, screen } from "@testing-library/react";
import MyComponent from "../path/to/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
```

For components that use Redux, you'll need to wrap them in a Provider:

```tsx
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../path/to/store";
import MyComponent from "../path/to/MyComponent";

describe("MyComponent with Redux", () => {
  it("renders with Redux state", () => {
    render(
      <Provider store={store}>
        <MyComponent />
      </Provider>
    );
    // Your assertions here
  });
});
```

## License

This project is private and proprietary. All rights reserved.
