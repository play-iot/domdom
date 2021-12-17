const PATHS = require('./paths');

module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [PATHS.src.wildcard('**', '*.{ts,tsx}')],
  coverageDirectory: PATHS.testCoverageDir,
  coverageReporters: ['json', 'lcov', 'html'],
  rootDir: PATHS.root.path,
  roots: [PATHS.src.path, PATHS.test.path],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^src/(.*)': PATHS.src.wildcard('$1'),
    '^tests/(.*)': PATHS.src.wildcard('$1'),
    '\\.(css|less)$': PATHS.testMock.to('styleMock.js'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      PATHS.testMock.to('fileMock.js'),
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime).+(js|jsx)$', '/node_modules/'],
  setupFilesAfterEnv: [PATHS.test.to('setupTests.ts')],
  testEnvironment: 'jsdom',
  testRegex: '/tests/.*\\.test\\.(ts|tsx)$',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: PATHS.testReportDir,
        outputName: 'jest.xml',
      },
    ],
  ],
};
