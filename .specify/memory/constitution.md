<!--
Sync Impact Report:
- Version change: N/A → 1.0.0 (Initial constitution)
- Added sections: All sections (initial creation)
- Added principles: 7 core principles established
- Templates requiring updates: None (initial creation)
- Follow-up TODOs: None
-->

# GScale Project Constitution

**Version**: 1.0.0
**Ratification Date**: 2026-03-19
**Last Amended**: 2026-03-19

## Preamble

This constitution establishes the fundamental principles, rules, and governance structure for the GScale musical scale visualization project. GScale serves as both a practical tool for musicians and a learning platform for modern React/Next.js development patterns.

## Core Principles

### 1. Modern React Patterns
**TypeScript-First Development**
- Strict TypeScript configuration with no implicit any
- Explicit interfaces for all component props and function signatures
- Type-safe Redux actions and selectors using RTK
- Generic types for reusable utilities

**Why**: Type safety prevents runtime errors, improves IDE support, and documents the codebase automatically.

**How to apply**: All new code must pass TypeScript strict mode. Use type inference judiciously but prioritize explicit types at module boundaries.

### 2. Performance-Driven Architecture
**Optimized State Management**
- Use Redux Toolkit for global state with proper normalization
- Implement React.memo for expensive components
- Leverage useMemo and useCallback for computed values
- Prefer local state over global when appropriate

**Why**: Musical visualization requires smooth interactions and real-time updates without jank.

**How to apply**: Profile before optimizing. Use React DevTools Profiler to identify performance bottlenecks.

### 3. Accessibility First
**Inclusive Design Standards**
- WCAG 2.1 AA compliance minimum
- Keyboard navigation for all interactive elements
- ARIA labels for complex visualizations
- High contrast mode support
- Screen reader compatibility for scale information

**Why**: Music education should be accessible to all learners regardless of ability.

**How to apply**: Test with screen readers and keyboard-only navigation during development.

### 4. Progressive Enhancement
**Mobile-First Responsive Design**
- Touch-friendly interfaces for mobile devices
- Progressive Web App capabilities
- Offline support for cached scales
- Responsive SVG rendering

**Why**: Musicians use various devices; the tool must work everywhere.

**How to apply**: Design mobile layouts first, then enhance for larger screens.

### 5. Musical Accuracy
**Theoretical Correctness**
- Accurate scale calculations using equal temperament
- Proper enharmonic equivalents handling
- Support for microtonal scales
- Correct interval relationships

**Why**: Incorrect musical information is worse than no information.

**How to apply**: Cross-reference scale calculations with established music theory sources.

### 6. Developer Experience Excellence
**Modern Tooling Standards**
- Turbopack for fast development builds
- ESLint with strict rules
- Prettier for consistent formatting
- Husky pre-commit hooks
- Automated testing in CI/CD

**Why**: Fast feedback loops enable rapid iteration and higher quality code.

**How to apply**: Never disable linting rules without team consensus.

### 7. Learning Platform Integrity
**Educational Value Preservation**
- Multiple state management approaches for learning (Context, Redux, local state)
- Clear code comments explaining architectural decisions
- Comprehensive documentation
- Example implementations for different patterns

**Why**: The project serves as a learning resource for React/Next.js patterns.

**How to apply**: Document why patterns are used, not just what they do.

## Governance

### Amendment Process
1. Propose changes via GitHub issue with rationale
2. Discussion period of at least 7 days
3. Approval requires consensus from 2+ contributors
4. Update version number following semantic versioning:
   - MAJOR: Principle additions/removals or breaking changes
   - MINOR: Clarifications or new non-breaking guidance
   - PATCH: Typos, formatting, or minor corrections

### Version Management
- Constitution version tracked in this document
- Changes logged in Sync Impact Report (HTML comment at top)
- Version bumps require updating both version field and date

### Compliance Review
- Quarterly review of codebase against constitution
- Automated checks for TypeScript strict mode
- Manual review for accessibility and performance standards
- Documentation updates required for any principle changes

## Rules and Standards

### Component Architecture
- **Functional components only** - No class components (legacy ErrorBoundary excepted)
- **Custom hooks for complex logic** - Extract stateful logic into reusable hooks
- **Composition over inheritance** - Use component composition patterns
- **Single responsibility** - One component, one purpose

### State Management Guidelines
- **Redux for global state** - User preferences, application state
- **Context for feature state** - When props drilling exceeds 2 levels
- **Local state for UI state** - Form inputs, toggle states
- **URL state for navigation** - Use Next.js App Router patterns

### Code Quality Standards
- **100% TypeScript coverage** - No JavaScript files in src/
- **Test coverage minimum 80%** - Unit tests for utilities, integration for features
- **No console.log in production** - Use proper logging framework
- **Error boundaries required** - Wrap all feature components

### Performance Requirements
- **Lighthouse score > 90** - Performance, accessibility, best practices
- **First Contentful Paint < 1.5s** - On 3G connection
- **Time to Interactive < 3.5s** - On 3G connection
- **Bundle size monitoring** - Alert on >10% increases

### Security Standards
- **No direct DOM manipulation** - Use React refs when necessary
- **Sanitize user inputs** - Especially for custom tuning names
- **CSP headers configured** - Content Security Policy implementation
- **No inline scripts** - Use Next.js Script component

### Documentation Requirements
- **README updates** - For new features or setup changes
- **Component JSDoc** - Props, return types, and usage examples
- **Architecture Decision Records** - For significant architectural choices
- **API documentation** - For utility functions and hooks

## Enforcement

Violations of this constitution should be addressed through:
1. Code review feedback
2. Automated linting and testing
3. Regular architecture reviews
4. Community discussion for edge cases

The constitution evolves with the project. When patterns become outdated, propose amendments rather than working around them.