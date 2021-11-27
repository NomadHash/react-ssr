/* eslint-disable max-len */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const hotMiddlewareScript = `webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true`;

const getEntryPoint = (target) => {
  if (target === 'node') {
    return ['./src/App.tsx'];
  }
  return devMode ? [hotMiddlewareScript, './src/index.tsx'] : ['./src/index.tsx'];
};

const getConfig = (target) => ({
  mode: devMode ? 'development' : 'production',

  name: target,

  target,

  entry: getEntryPoint(target),

  output: {
    path: path.resolve(__dirname, `dist/${target}`),
    filename: '[name].js',
    publicPath: '/web/',
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },

  plugins:
    target === 'web'
      ? [new LoadablePlugin(), new MiniCssExtractPlugin(), new webpack.HotModuleReplacementPlugin()]
      : [new LoadablePlugin(), new MiniCssExtractPlugin()],

  externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
});

module.exports = [getConfig('web'), getConfig('node')];
