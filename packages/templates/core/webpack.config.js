const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const config = require('./package.json');
const postcssConfig = require('./.postcssrc.json');

const postcssPlugins = postcssConfig.plugins;
const styleLoader = {
  loader: 'style-loader',
  options: {
    esModule: true,
  },
};
const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: {
      namedExport: true,
      localIdentName: '[local]',
    },
  },
};
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    implementation: require('postcss'),
    postcssOptions: {
      "modules": true,
      "plugins": postcssPlugins,
    },
  },
};
const sassLoader = {
  loader: 'sass-loader',
  options: {
    implementation: require('sass'),
    sassOptions: {
      includePaths: [
        "./",
        "../../../node_modules/",
        "./node_modules/",
      ],
    },
  },
};
const fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
  },
};

module.exports = {
  entry: './web/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/,
        use: [styleLoader, cssLoader, postcssLoader, sassLoader],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpeg)&/,
        use: [fileLoader],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDom',
  },
  externalsType: "window",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  output: {
    libraryTarget: "umd",
    filename: path.basename(config.exports['./web']),
    path: path.resolve(__dirname, 'dist'),
  },
};
