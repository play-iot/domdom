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

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

// TO ADD
// yarn add -D rollup rollup-plugin-dts rollup-plugin-peer-deps-external rollup-plugin-postcss \
// rollup-plugin-terser @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-typescript

const packageJson = require('./package.json');

export default [
  {
    input: packageJson.source,
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [external(), resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), postcss(), terser()],
  },
  {
    input: 'dist/dist/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
