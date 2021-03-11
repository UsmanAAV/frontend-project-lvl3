/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const BUNDLE_NAME = 'bundle.js';
const PATHS = {
  app: path.join(__dirname, './src/index.ts'),
  dist: path.join(__dirname, 'dist'),
  template: path.resolve(__dirname, './index.html'),
};

module.exports = {
  entry: PATHS.app,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    path: PATHS.dist,
    filename: BUNDLE_NAME,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader',
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: PATHS.template,
      filename: 'index.html',
    }),
  ],
};
