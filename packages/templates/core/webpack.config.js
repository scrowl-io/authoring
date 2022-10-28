const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const config = require('./package.json');

module.exports = merge(common, {
  entry: {
    [`${path.basename(config.exports['./web'], '.js')}`]: './web/index.ts',
  },
  output: {
    libraryTarget: "umd",
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
});