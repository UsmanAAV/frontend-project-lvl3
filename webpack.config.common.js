const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const BUNDLE_NAME = "bundle.js";
const PATHS = {
  app: [path.join(__dirname, "./src/index.js")],
  src: path.join(__dirname, "./src/"),
  dist: path.join(__dirname, "dist"),
  template: path.resolve(__dirname, "template.html"),
};

module.exports = {
  entry: {
    app: PATHS.app,
  },

  output: {
    path: PATHS.dist,
    filename: BUNDLE_NAME,
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: PATHS.template,
      filename: "index.html",
    }),
  ],
};
