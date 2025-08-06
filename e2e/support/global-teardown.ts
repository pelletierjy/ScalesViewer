import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Clean up any global resources if needed
  console.log('E2E test suite completed');
}

export default globalTeardown;