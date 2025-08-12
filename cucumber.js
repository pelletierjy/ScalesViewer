process.env.TS_NODE_PROJECT = 'e2e/tsconfig.json';

module.exports = {
  default: {
    require: ['e2e/step-definitions/**/*.ts', 'e2e/hooks/**/*.ts'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    format: ['progress-bar', 'json:reports/cucumber-report.json'],
  },
};
