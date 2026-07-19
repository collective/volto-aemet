// Load Volto's moduleNameMapper so we can extend it without losing its entries.
// (jest-extender-plugin does a shallow merge, so we must carry them forward.)
const voltoJestMapper = require('./core/packages/volto/package.json').jest
  .moduleNameMapper;

module.exports = {
  roots: ['../../../packages'],
  testMatch: ['<rootDir>/../../../../**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: [
    'src/addons/**/src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  transformIgnorePatterns: ['node_modules/(?!(volto-slate|@plone/volto)/)'],
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
  moduleNameMapper: {
    // Preserve all Volto module mappings
    ...voltoJestMapper,
    // Map volto-aemet package imports to the addon src/ directory so that
    // icon paths (e.g. volto-aemet/icons/...) resolve correctly in tests.
    // The ^ anchor is critical: without it the regex also matches absolute
    // pnpm store paths that contain "volto-aemet/" as a directory fragment.
    '^volto-aemet/(.*)$': '<rootDir>/../../../packages/volto-aemet/src/$1',
  },
};
