module.exports = {
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.js$',
  testEnvironment: 'node',
  verbose: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/test',
    '<rootDir>/src/.*/_mocks_/.*'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/__mocks__',
    '<rootDir>/src/.*/__mocks__/.*',
    '<rootDir>/node_modules'
  ],
  globals: {
    __DEV__: true
  },
  setupFiles: ['<rootDir>/setupJest.js']
}
