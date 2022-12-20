const path = require('path');
const { merge } = require('webpack-merge');
const common = require('@scrowl/config/webpack');

module.exports = merge(common, {
  entry: {
    [`proxy-web`]: './src/server/proxy',
  },
  output: {
    libraryTarget: "umd",
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/app'),
  },
});