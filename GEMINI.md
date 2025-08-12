# Project: GScale - Musical Scale Visualization Tool

## Project Overview

This is a musical scale visualization tool built with Next.js, React, and TypeScript. It helps musicians visualize scales on various instruments like guitar, piano, flute, and kalimba. The application is styled with Tailwind CSS and uses Redux for state management. It's designed as a learning platform for experimenting with different AI providers and development techniques.

## Building and Running

### Prerequisites

- Node.js 18+
- npm 8+
- Windows users might need to install `windows-build-tools`:
  ```bash
  npm install --global windows-build-tools
  ```

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

-   **Web Development:**
    ```bash
    npm run dev
    ```
    This runs the Next.js development server with Turbopack and hot reloading. Access the application at `http://localhost:3000`.

### Building for Production

-   **Web Production Build:**
    ```bash
    npm run build
    ```
-   **Desktop Production Build:**
    ```bash
    npm run build-prepare
    ```

### Testing

This project uses Jest for unit tests, Playwright for end-to-end tests, and Cucumber for BDD testing.

-   **Run all tests:**
    ```bash
    npm test
    ```
-   **Run tests in watch mode:**
    ```bash
    npm run test:watch
    ```
-   **Run tests with coverage report:**
    ```bash
    npm run test:coverage
    ```
-   **Run Playwright E2E tests:**
    ```bash
    npm run test:e2e
    ```
-   **Run Cucumber tests:**
    ```bash
    npm run test:cucumber
    ```

## Development Conventions

### Project Structure

The project follows a standard Next.js structure with the addition of directories for testing and documentation.

```
src/
├── app/                    # Next.js app router pages
├── components/            # Shared UI components
├── features/             # Feature-specific components
├── lib/                  # Shared utilities
└── __tests__/              # Jest tests

e2e/                      # Playwright E2E tests
features/                 # Cucumber feature files
```

### State Management

-   **Redux:** Used for global state management. The root store persists state to local storage.
-   **Local State:** Some components, like the guitar and piano pages, use local state and local persistence for demonstration purposes.

### Testing

-   **Unit Tests:** Located in `src/__tests__`. Test files are named `*.test.tsx` or `*.test.ts`.
-   **E2E Tests:** Located in the `e2e` directory.
-   **BDD Tests:** Feature files are in the `features` directory, and step definitions are in `e2e/step-definitions`.

### Contribution Guidelines

1.  Create a new feature branch from `main`.
2.  Make your changes.
3.  Submit a pull request.
