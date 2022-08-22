const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ZipPlugin({
      pathPrefix: "dist",
      exclude: [/\.map$/],
    }),
  ],
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    liveReload: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
