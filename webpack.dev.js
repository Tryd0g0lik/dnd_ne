const path = require('path');
const common = require("./webpack.config");
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  devServer: {
    open: true,
    host: 'localhost',
    compress: true,
    historyApiFallback: true
  },
  plugins: [
    new ESLintPlugin({
      files: path.resolve(__dirname, './src/ts'),
    }),
  ]
});

