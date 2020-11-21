const { merge } = require("webpack-merge");
const CommonConfig = require("./webpack.config.common.js");

module.exports = merge(CommonConfig, {
  mode: "development",

  watch: true,

  watchOptions: {
    ignored: "/node_modules/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            sourceMaps: true,
            presets: ["@babel/preset-env"],
            plugins: [],
          },
        },
      },
    ],
  },

  devtool: "inline-source-map",

  devServer: {
    compress: false,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
});
