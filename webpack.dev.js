process.traceDeprecation = true;
const path = require('path');
const common = require("./webpack.config.js");
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    open: true,
    host: 'localhost',
    compress: true,
    historyApiFallback: true,
    contentBase: './dist'
  },

  plugins: [
    new ESLintPlugin({
      files: path.resolve(__dirname, './src/ts'),
    }),
  ]
});

