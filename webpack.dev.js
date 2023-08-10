process.traceDeprecation = true;
const path = require('path');
const common = require("./webpack.config.js");
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
const webpack = require('webpack');


module.exports = merge(common, {
  mode: 'development',

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compess: true,
    historyApiFallback: true,
    // open: true,
    port: 8080,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      files: path.resolve(__dirname, './src/ts'),
    }),
  ]
});

