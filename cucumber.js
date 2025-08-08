const config = {
  // Feature files location
  features: ['features/**/*.feature'],
  
  // Step definitions location
  require: [
    'e2e/step-definitions/*.ts',
    'e2e/hooks/*.ts'
  ],
  
  // Require setup for TypeScript  
  requireModule: ['ts-node/register'],
  
  // Output format
  format: [
    'progress-bar',
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html',
    '@cucumber/pretty-formatter'
  ],
  
  // Tags to run/exclude
  tags: process.env.CUCUMBER_TAGS || 'not @skip',
  
  // Parallel execution
  parallel: process.env.CI ? 1 : 2,
  
  // Retry failed scenarios
  retry: process.env.CI ? 1 : 0,
  
  // Exit after first failure (useful for debugging)
  failFast: process.env.FAIL_FAST === 'true',
  
  // Dry run for syntax checking
  dryRun: process.env.DRY_RUN === 'true',
  
  // World parameters (passed to World constructor)
  worldParameters: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO || '0'),
    video: process.env.VIDEO === 'true' ? 'retain-on-failure' : 'off',
    screenshot: 'only-on-failure',
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },
  
  // Formatters options
  formatOptions: {
    snippetInterface: 'async-await'
  },
  
  // Publish to Cucumber Reports (if configured)
  publish: process.env.CUCUMBER_PUBLISH === 'true'
};

module.exports = config;