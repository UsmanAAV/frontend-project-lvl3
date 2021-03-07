/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.config.common.js');

module.exports = merge(CommonConfig, {
  mode: 'production',

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});
