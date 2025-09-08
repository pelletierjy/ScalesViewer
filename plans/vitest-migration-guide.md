# Vitest Migration Guide

## Overview
This guide provides detailed steps for migrating from Jest to Vitest in the ScalesViewer project.

## Pre-Migration Checklist
- [ ] Backup current test setup
- [ ] Create feature branch for migration
- [ ] Ensure all tests are passing with Jest
- [ ] Document any Jest-specific workarounds

## Step-by-Step Migration

### 1. Package Dependencies

```bash
# Remove Jest packages
npm uninstall jest jest-environment-jsdom babel-jest @types/jest

# Install Vitest packages
npm install -D vitest @vitest/ui @vitest/coverage-v8 jsdom @vitest/coverage-istanbul

# Install Vitest-compatible testing library
npm install -D @testing-library/react-vitest
```

### 2. Configuration Migration

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.d.ts',
        'src/**/*.stories.{js,jsx,ts,tsx}',
      ],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 3. Setup File Migration

Create `vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
```

### 4. Test File Updates

Update test files to use Vitest imports:

```typescript
// Before (Jest)
describe('CustomTuningEditor', () => {
  it('renders with default values', () => {
    const onSaveMock = jest.fn()
    const onCancelMock = jest.fn()
    // test code
  })
})

// After (Vitest)
import { describe, it, expect, vi } from 'vitest'

describe('CustomTuningEditor', () => {
  it('renders with default values', () => {
    const onSaveMock = vi.fn()
    const onCancelMock = vi.fn()
    // test code
  })
})
```

### 5. Package.json Scripts

Update scripts in `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

### 6. TypeScript Configuration

Update `tsconfig.json` to include Vitest types:
```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

## Migration by File Type

### Component Tests
- Update imports to use Vitest
- Replace `jest.fn()` with `vi.fn()`
- Update mock implementations
- Ensure React Testing Library compatibility

### Utility Function Tests
- Convert Jest matchers to Vitest equivalents
- Update mock implementations
- Verify async test behavior

### Custom Test Utilities
- Update `test-utils.tsx` to use Vitest
- Ensure proper provider setup
- Maintain compatibility with React Testing Library

## Testing the Migration

### 1. Run All Tests
```bash
npm test
```

### 2. Check Coverage
```bash
npm run test:coverage
```

### 3. Watch Mode Test
```bash
npm run test:watch
```

### 4. UI Mode Test
```bash
npm run test:ui
```

## Common Issues and Solutions

### Issue 1: Module Resolution
**Problem**: Tests can't find modules
**Solution**: Ensure `tsconfig.json` paths are properly configured in `vitest.config.ts`

### Issue 2: Mock Behavior Differences
**Problem**: Jest mocks behave differently than Vitest mocks
**Solution**: Review mock implementations and update as needed

### Issue 3: Async Test Timing
**Problem**: Async tests fail or timeout
**Solution**: Update async test patterns to match Vitest expectations

### Issue 4: TypeScript Errors
**Problem**: TypeScript compilation errors
**Solution**: Update type definitions and ensure proper configuration

## Rollback Plan

If migration issues arise:
1. Keep Jest configuration files during transition
2. Maintain parallel test runs initially
3. Have backup branch with working Jest setup
4. Document any blocking issues for future resolution

## Success Criteria

- [ ] All 66 existing tests pass with Vitest
- [ ] Coverage maintained at 18.2% or higher
- [ ] Watch mode performance improved
- [ ] No regression in test functionality
- [ ] Team comfortable with new testing workflow

## Post-Migration Optimization

### Performance Improvements
- Enable Vitest's multi-threading
- Optimize test file organization
- Implement selective test running

### Enhanced Features
- Add Vitest UI for better test visualization
- Implement snapshot testing if needed
- Add performance benchmarks

## Timeline

**Estimated Time: 2-3 days**
- Day 1: Configuration and dependency migration
- Day 2: Test file conversion and validation
- Day 3: Performance optimization and documentation

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vitest vs Jest Comparison](https://vitest.dev/guide/comparisons.html)
- [Next.js with Vitest](https://nextjs.org/docs/testing#vitest)
- [React Testing Library with Vitest](https://testing-library.com/docs/react-testing-library/setup/)`