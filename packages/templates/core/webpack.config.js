const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./package.json');
const postcssConfig = require('./.postcssrc.json');

const postcssPlugins = postcssConfig.plugins;
const cssExtractLoader = {
  loader: MiniCssExtractPlugin.loader,
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
  entry: {
    [`${path.basename(config.exports['./web'], '.js')}`]: './web/index.ts',
  },
  mode: 'production',
  module: {
    noParse: [
      require.resolve('react'),
      require.resolve('react-dom'),
      require.resolve('react-dom/server'),
      require.resolve('prop-types'),
    ],
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [cssExtractLoader, cssLoader, postcssLoader, sassLoader],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpeg)$/,
        use: [fileLoader],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs: 'react-dom/server',
      commonjs2: 'react-dom/server',
    },
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
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
