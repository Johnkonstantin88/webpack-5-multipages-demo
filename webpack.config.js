const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    'index': "./src/index.js",
    'gallery': "./src/gallery.js",
  },

  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "sass-loader"],
      },

      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: "index.html",
      template: "./src/index.html",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      chunks: ['gallery'],
      filename: "gallery.html",
      template: "./src/gallery.html",
      inject: "body",
    }),
    new FileManagerPlugin({
       events: {
         onStart: {
           delete: ['dist'],
         },
       },
    }),
    new MiniCssExtractPlugin({
       filename: '[name].[contenthash].css',
     }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    // compress: true,
    port: 3000,
  },
};
