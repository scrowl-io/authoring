const path = require('path');
const { merge } = require('webpack-merge');
const common = require('@scrowl/template-core/webpack.config');
const config = require('./package.json');

module.exports = merge(common, {
  entry: {
    [`${path.basename(config.exports['./web'], '.js')}`]: './web/index.ts',
  },
  module: {
    noParse: [
      require.resolve('@scrowl/template-core')
    ],
  },
  externals: {
    '@scrowl/template-core': {
      root: 'Scrowl',
      commonjs: '@scrowl/template-core',
      commonjs2: '@scrowl/template-core',
    }
  },
  output: {
    libraryTarget: "umd",
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
});