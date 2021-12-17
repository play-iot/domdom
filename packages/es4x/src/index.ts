/*
 * Copyright (c) 2021. https://playio.cloud/
 * All rights reserved.
 */

import { hello } from '@tikio/wire';
import { HttpServerRequest } from '@vertx/core';

vertx
  .createHttpServer()
  .requestHandler(function (req: HttpServerRequest) {
    req.response().putHeader('content-type', 'text/plain').end(`Hello ES4X ${hello}!`);
  })
  .listen(3001);

console.log('Server started on port 3001');
