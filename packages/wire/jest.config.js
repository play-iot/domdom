/*
 * Copyright (c) 2021. https://playio.cloud/
 * All rights reserved.
 */

const sharedConfig = require('../../jest.config.js');

module.exports = {
  ...sharedConfig,
  rootDir: './',
  testEnvironment: 'node',
};
