/*
 * Copyright (c) 2021. https://playio.cloud/
 * All rights reserved.
 */

import { TestContext, TestSuite } from '@vertx/unit';

const suite = TestSuite.create('the_test_suite');

suite.test('my_test_case', (should: TestContext) => {
  const s = 'value';
  should.assertEquals('value', s);
});

suite.run();
