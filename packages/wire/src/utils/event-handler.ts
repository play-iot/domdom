/*
 * Copyright (c) 2022. https://playio.cloud/
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * All rights reserved.
 */

interface EventExecutor<T, R> {
  execute(input: T): R;
}

interface EventInterceptor<T, R> {
  beforeFn(): EventExecutor<T, T>[];

  executeFn(): EventExecutor<T, R>;

  afterFn(): EventExecutor<R, R>[];
}

interface EventHandler<T, R> {
  perform(input: T): R;

  registerOnBefore(fn: (t: T) => T): EventHandler<T, R>;

  registerOnAfter(fn: (r: R) => R): EventHandler<T, R>;
}

class DefaultEventHandler<T, R> implements EventHandler<T, R>, EventInterceptor<T, R> {
  private beforeFunc: EventExecutor<T, T>[] = [];
  private afterFunc: EventExecutor<R, R>[] = [];
  private readonly executeFunc: EventExecutor<T, R>;

  constructor(executeFn: EventExecutor<T, R>) {
    this.executeFunc = executeFn;
  }

  beforeFn(): EventExecutor<T, T>[] {
    return this.beforeFunc;
  }

  afterFn(): EventExecutor<R, R>[] {
    return this.afterFunc;
  }

  executeFn(): EventExecutor<T, R> {
    return this.executeFunc;
  }

  perform(input: T): R {
    const i: T | undefined = this.beforeFn().reduce((val: T, fn: EventExecutor<T, T>) => fn.execute(val), input);
    const out = this.executeFn().execute(i);
    return this.afterFn().reduce((val: R, fn: EventExecutor<R, R>) => fn.execute(val), out);
  }

  registerOnBefore(fn: (t: T) => T): EventHandler<T, R> {
    this.beforeFunc.push(
      new (class implements EventExecutor<T, T> {
        execute = (input: T): T => fn(input);
      })(),
    );
    return this;
  }

  registerOnAfter(fn: (r: R) => R): EventHandler<T, R> {
    this.afterFunc.push(
      new (class implements EventExecutor<R, R> {
        execute = (result: R): R => fn(result);
      })(),
    );
    return this;
  }
}

const createEventHandler = <T, R>(fn: (t: T) => R): EventHandler<T, R> =>
  new DefaultEventHandler(
    new (class implements EventExecutor<T, R> {
      execute = (input: T): R => fn(input);
    })(),
  );

export { createEventHandler };
export type { EventExecutor, EventInterceptor, EventHandler };
