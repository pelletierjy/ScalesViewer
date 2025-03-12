# GScale Development Rules

## Code Organization

### Component Structure

- Components are organized by feature in `src/features/`
- Guitar-specific components in `src/features/guitar/`
- Scale-related components in `src/features/scales/`
- Shared utilities in `src/lib/utils/`

### File Naming

- React components: PascalCase (e.g., `GuitarNeck.tsx`)
- Utilities: camelCase (e.g., `scaleUtils.ts`)
- Constants: UPPER_SNAKE_CASE for values, PascalCase for types
- Test files: Same name as component with `.test.tsx` suffix

## Coding Standards

### TypeScript

- Strict typing required
- Explicit interface definitions for props
- Type exports in dedicated types folder
- No `any` types unless absolutely necessary

### Components

- Functional components with hooks
- Props interface at top of file
- Destructured props
- Clear component responsibilities
- Modular design

### State Management

- Local state for component-specific data
- LocalStorage for persistence
- Props for component communication
- Custom hooks for complex logic

### Styling

- Tailwind CSS for all styling
- Dark/light theme support
- Mobile-first responsive design
- Consistent spacing using Tailwind classes

## Guitar Scale Viewer Specific

### Scale Implementation

- Consistent note naming (sharps preferred)
- Zero-based array indexing
- One-based fret numbering
- Support for both note names and scale degrees
- Proper interval calculations
- Note transposition support

### Visual Elements

- SVG-based guitar neck
- Proper string spacing
- Progressive string thickness
- Clear note markers
- Distinct root note styling
- Zero fret note display
- Scale-aware note display

### Tuning System

- Support for 4-18 strings
- Custom scaleRoot creation
- Import/export functionality
- Preset management
- Base scaleRoot transposition
- Zero fret note display

### Fret Display

- Support for 12, 20-24 frets
- Clear fret markers
- Proper spacing
- Orientation options
- Zero fret notes

## Testing

- Unit tests for utilities
- Component testing
- Accessibility testing
- Cross-browser compatibility

## Git Workflow

- Feature branches from main
- Descriptive commit messages
- Pull request reviews
- Version tagging

## Documentation

- Component documentation
- Type definitions
- Utility function documentation
- Setup instructions
- User guide updates

## Build Process

- Next.js production build
- Static export support
- Asset optimization
- Performance monitoring
