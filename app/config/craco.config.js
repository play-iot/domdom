/*
 * Copyright (c) 2021. https://playio.cloud/
 * All rights reserved.
 */
const CracoAlias = require('craco-alias');
const CracoAntDesignPlugin = require('craco-antd');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const WebpackBar = require('webpackbar');
const PATHS = require('./paths');

console.log(process.env.NODE_ENV);
const webpackPlugins =
  process.env.NODE_ENV === 'development' ? [new BundleAnalyzerPlugin({ openAnalyzer: false })] : [];

module.exports = {
  babel: {
    presets: [],
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'ant'],
      [
        'import',
        {
          libraryName: '@ant-design/icons',
          libraryDirectory: 'es/icons',
          camel2DashComponentName: false,
        },
        'ant-design-icons',
      ],
    ],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      return babelLoaderOptions;
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        debug: false,
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.build.json',
      },
    },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: PATHS.src.to('style', 'antd.customize.less'),
      },
    },
  ],
  webpack: {
    plugins: [new AntdDayjsWebpackPlugin(), new WebpackBar({ profile: true }), ...webpackPlugins],
  },
};
