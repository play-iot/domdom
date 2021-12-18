/*
 * Copyright (c) 2021-2021. https://playio.cloud/
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * All rights reserved.
 */

import { isFunction } from './checker';

// FIXME: must notify to global error state then show error model in frontend instead of using `alert`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function logError(error, ...args: any[]) {
  console.error(error);
  // if (isFunction(window.alert)) {
  //   // eslint-disable-next-line no-alert
  //   alert(error.toString());
  // } else {
  //   throw error;
  // }
}

export const ErrorHandler = (target: any, propertyKey: string, descriptor: any) => {
  const fn = descriptor.value!;
  descriptor.value = function DescriptorValue(...args: any[]) {
    try {
      return fn.apply(this, args);
    } catch (error) {
      logError(error, ...args);
    }
  };
  return descriptor;
};

export const ErrorCallbackHandler = (errHandler: any) => (target: any, propertyKey: string, descriptor: any) => {
  const fn = descriptor.value!;
  descriptor.value = function DescriptorValue(...args: any[]) {
    try {
      return fn.apply(this, args);
    } catch (error) {
      logError(error, ...args);
      if (isFunction(errHandler)) {
        return errHandler(error, args);
      }
    }
  };
  return descriptor;
};
