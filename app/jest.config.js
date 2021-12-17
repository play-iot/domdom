/*
 * Copyright (c) 2021. https://playio.cloud/
 * All rights reserved.
 */

const sharedConfig = require('../jest.config.js');

module.exports = {
  ...sharedConfig,
  rootDir: './',
  moduleNameMapper: {
    ...sharedConfig.moduleNameMapper,
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime).+(js|jsx)$', '/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testEnvironment: 'jsdom',
};
