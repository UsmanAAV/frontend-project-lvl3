const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AutoprefixerPlugin = require("autoprefixer");

const BUNDLE_NAME = "bundle.js";
const PATHS = {
  app: [path.join(__dirname, "./src/index.js")],
  dist: path.join(__dirname, "dist"),
  template: path.resolve(__dirname, "static/template.html"),
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
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: "style-loader",
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader",
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins() {
                  return [AutoprefixerPlugin];
                },
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader",
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
