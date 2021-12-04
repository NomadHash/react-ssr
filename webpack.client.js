/* eslint-disable max-len */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
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
      {
        // write image files under 10k to inline or copy image files over 10k
        test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        // write files under 10k to inline or copy files over 10k
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'assets/fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'jsx'],
    alias: {
      '@src': path.resolve('src/'),
      '@components': path.resolve('src/components/'),
      '@assets': path.resolve('src/assets/'),
      '@lib': path.resolve('src/lib/'),
      '@pages': path.resolve('src/pages/'),
      '@store': path.resolve('src/store/'),
    },
  },

  plugins:
    target === 'web'
      ? [new Dotenv(), new LoadablePlugin(), new MiniCssExtractPlugin(), new webpack.HotModuleReplacementPlugin()]
      : [new LoadablePlugin(), new MiniCssExtractPlugin()],

  externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
});

module.exports = [getConfig('web'), getConfig('node')];
