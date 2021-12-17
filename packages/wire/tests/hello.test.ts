/*
 * Copyright (c) 2021. https://playio.cloud/
 * All rights reserved.
 */

import { hello } from '../src';

test('simple', () => {
  expect(hello).toEqual(88);
});
