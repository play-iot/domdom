module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['prettier', 'airbnb-typescript/base', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    ecmaVersion: 'es2021',
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint', 'jest'],
  ignorePatterns: ['dist', 'build', 'config', '.babelrc', '.eslintrc.js'],
  overrides: [
    {
      files: ['**/tests/**/*.{j,t}s?(x)', '**/tests/**/*.spec.{j,t}s?(x)'],
      env: {
        browser: false,
        jest: true,
      },
    },
  ],
  rules: {
    'camelcase': [2, { properties: 'never' }],
    'semi': [2, 'always'],
    'lines-between-class-members': 'off',
    'no-console': 'warn',
    'no-use-before-define': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-param-reassign': 0,
    'import/first': 'error',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'tests/**', // also common npm pattern
          '**/jest.config.js', // jest config
          '**/jest.setup.js', // jest setup
          '**/vue.config.js', // vue-cli config
          '**/.eslintrc.js', // eslint config
        ],
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true, exceptAfterOverload: true },
    ],
  },
};
