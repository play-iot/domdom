module.exports = {
  rootDir: './',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  preset: 'ts-jest',
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  coverageDirectory: '<rootDir>/build/coverage',
  coverageReporters: ['json', 'lcov', 'html'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
    '^tests/(.*)': '<rootDir>/tests/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testRegex: '/tests/.*\\.test\\.(ts|tsx)$',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/build/reports',
        outputName: 'jest.xml',
      },
    ],
  ],
};
