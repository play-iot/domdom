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

import { isNull, isNumeric, isTruthy } from './checker';

export type Constructor<T = Record<string, any>> = new (...args: any[]) => T;

export const toLowerSnakeCase = (label: string | undefined | null): string | undefined =>
  label?.toString().toLowerCase().replace(/-+\s+/g, '_');
export const convertToNumber = (value: any, strict = false): number | null => {
  if (isNull(value)) {
    return null;
  }
  const inString = value.toString();
  const n = +inString;
  if (isNumeric(n) && !/^\s*$/.test(inString)) {
    return n;
  }
  if (strict) {
    throw new Error('Invalid number');
  }
  return null;
};

export function* range(from: number, to: number, step = 1) {
  let i = 0;
  const length = ~~((to - from) / step) + 1;
  while (i < length) yield from + i++ * step;
}

export const union = (...collections): Set<any> => collections.reduce((c, l) => new Set([...c, ...l]), new Set());

export const unionToArray = (...collections): Array<any> => [...union(...collections)];

export const objectFilter = (
  obj: Record<string, unknown>,
  ...predicates: ((k: string, v: unknown) => unknown)[]
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => predicates.map((fn) => isTruthy(fn(key, val))).reduce((p, c) => p && c)),
  );

export const objectOf = <V>(k: string | number, v: V): Record<string, unknown> => {
  const o = {};
  o[k] = v;
  return o;
};

export const mapToObject = <V1, V2>(
  obj: { [key: string]: V1 },
  keyMapper: (k, v: V1) => string,
  valMapper: (k, v: V1) => V2,
): Record<string, V2> => {
  return isNull(obj)
    ? {}
    : Object.keys(obj).reduce((r, k) => ({ ...r, [`${keyMapper(k, obj[k])}`]: valMapper(k, obj[k]) }), {});
};

// export const mapToObjectSameKey = <V1, V2>(
//   obj: { [key: string]: V1 },
//   valMapper: (k, v: V1) => V2,
// ): { [key: string]: V2 } => mapToObject(obj, (k) => k, valMapper);
//
// export const arrayToTransformedObject = <T, V>(
//   arr: Array<T>,
//   keyMapper: (o: T, idx?: number) => string,
//   valMapper: (o: T, idx?: number) => V,
// ): Record<string, V> => {
//   let out = {};
//   return arr.reduce((obj, o, idx) => ({ ...obj, ...objectOf(keyMapper(o, idx), valMapper(o, idx)) }), out);
// };
//
// export const arrayToObject = <T>(arr: Array<T>, keyMapper: (o: T, idx?: number) => string): { [k: string]: T } =>
//   arrayToTransformedObject(arr, keyMapper, (o) => o);

// export const groupByThenTransform = <T, V>(
//   arr: Array<T>,
//   keyMapper: (o: T, idx?: number) => any,
//   accumulator: (o: T, key?: string, idx?: number) => V[],
// ): { [key: string]: V[] } => {
//   const t = arr.reduce((obj: { [key: string]: V[] }, o, idx) => {
//     const key = `${keyMapper(o, idx)}`;
//     obj[key] = [...(obj[key] ?? []), ...accumulator(o, key, idx)];
//     return obj;
//   }, {});
//   return t;
// };
//
// export const groupBy = <T>(arr: Array<T>, predicate: (o: T, idx?: number) => any): { [key: string]: T[] } =>
//   groupByThenTransform(arr, predicate, (o) => [o]);
//
// export const omit = <T>(obj: T, ...excludes: string[]) =>
//   isObject(obj) ? <T>objectFilter(obj, (k) => !excludes.includes(k)) : obj;
