/*
 * Copyright (c) 2021. https://playio.cloud/
 * All rights reserved.
 */

import { hello, Hey, Key } from '@domdom/wire';
import { HttpServerRequest } from '@vertx/core';

const hey: Hey = {
  name: 'hi',
  key: Key.Key1,
};

vertx
  .createHttpServer()
  .requestHandler(function (req: HttpServerRequest) {
    req
      .response()
      .putHeader('content-type', 'text/plain')
      .end(`Hello ES4X ${hello} - ${JSON.stringify(hey)}!`);
  })
  .listen(3001);

console.log('Server started on port 3001');
