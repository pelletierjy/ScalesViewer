const nextJest = require("next/jest");
const path = require("path");

const escapeForRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// testPathIgnorePatterns are regexes, so a bare `<rootDir>/e2e/` breaks on
// Windows: the substituted backslashes become regex escapes (`\.claude\work`
// -> `\w`), which silently stopped matching and pulled e2e specs into `jest`.
// Anchor each ignore to this config's own root instead.
const rootDir = __dirname;
const ignore = (relativePath) =>
  `${escapeForRegex(rootDir)}[\\\\/]${escapeForRegex(relativePath)}[\\\\/]`;

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next-intl$": "<rootDir>/__mocks__/next-intl.ts",
  },
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  testPathIgnorePatterns: [ignore("e2e"), ignore("node_modules"), ignore(".claude")],
  collectCoverage: true,
  coverageReporters: [
    "lcov",
    "text",
    "text-summary"
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  // Add a timeout to ensure tests clean up properly
  testTimeout: 10000,
  // Force exit after all tests complete
  forceExit: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
