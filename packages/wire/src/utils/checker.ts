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

export const isNull = (value: any): boolean => value == null; // undefined or null

export const isNotNull = (value: any): boolean => !isNull(value);

export const isFunction = (func: any): boolean => func && {}.toString.call(func) === '[object Function]';

export const isObject = (value: any): boolean => isNotNull(value) && typeof value === 'object';

export const isArray = (value: any): boolean => isNotNull(value) && Array.isArray(value);

export const isJSON = (value: any): boolean => isObject(value) || isArray(value);

export const isString = (value: any): boolean => typeof value === 'string' || value instanceof String;

export const isNumeric = (n): boolean => !Number.isNaN(parseFloat(n)) && Number.isFinite(parseFloat(n));

export const isGreaterThanZero = (v: any): boolean => isNumeric(v) && +v > 0;

export const isFalsy = (v: any): boolean =>
  isNull(v) || v === false || v === '' || Number.isNaN(v) || [0, -0].includes(v);

export const isTruthy = (v: any): boolean => !isFalsy(v);

export const isEmpty = (value: any): boolean => {
  if (isNull(value)) {
    return true;
  }
  if (value instanceof Array) {
    return value.length === 0;
  }
  if (value instanceof Object) {
    return Object.keys(value).length === 0;
  }
  if (value instanceof String) {
    return value.trim() === '';
  }
  return value.toString().trim() === '';
};
