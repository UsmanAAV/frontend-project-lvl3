const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.config.common.js');

module.exports = merge(CommonConfig, {
  mode: 'development',

  watch: true,

  watchOptions: {
    ignored: '/node_modules/',
  },

  devtool: 'inline-source-map',

  devServer: {
    compress: false,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
});
