const { resolve, sep } = require('path');

const PATH = (base) => {
  const path = base;

  function to(...file) {
    return resolve(path, ...file);
  }

  function wildcard(...wildcardOrRegex) {
    return `${path}${sep}${wildcardOrRegex.join(sep)}`;
  }

  return Object.freeze({ path, to, wildcard });
};

const root = PATH(resolve(__dirname, '../'));
const src = PATH(root.to('src'));
const test = PATH(root.to('tests'));
const build = PATH(root.to('build'));

module.exports = {
  root,
  src,
  test,
  testMock: PATH(test.to('__mocks__')),
  entryFile: './index.tsx',
  config: PATH(root.to('config')),
  dist: PATH(root.to('dist')),
  build,
  testReportDir: build.to('reports'),
  testCoverageDir: build.to('coverage'),
};
