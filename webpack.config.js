// Generated using webpack-cli https://github.com/webpack/webpack-cli
process.traceDeprecation = true;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const stylesHandler = MiniCssExtractPlugin.loader;



module.exports = {
  entry: './src/index.js',
  mode: 'none',
  target: 'web',

  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  // devServer: {
  //   open: true,
  //   host: 'localhost',
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: false,
      }
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      exclude: "./src/index.js"
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        include: [
          path.resolve(__dirname, 'src/ts')
        ],
      },
      {
        test: /\.js$/i,
        include: [
          path.resolve(__dirname, './src'),
        ],
        use: [{
          loader: 'babel-loader',
        },],
      },
      {
        test: /\.css$/i,
        sideEffects: true,
        include: [
          path.resolve(__dirname, './src/styles'),
        ],
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

