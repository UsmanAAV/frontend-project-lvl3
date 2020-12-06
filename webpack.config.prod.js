const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.config.common.js');

module.exports = merge(CommonConfig, {
  mode: 'production',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: false,
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMaps: false,
            presets: ['@babel/preset-env'],
            plugins: [],
          },
        },
      },
    ],
  },
});
