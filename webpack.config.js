const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var ZipPlugin = require("zip-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin(),
    new ZipPlugin({
      pathPrefix: "dist",
    }),
  ],
};
