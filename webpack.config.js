const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main.js',
  ],

  output: {
    publicPath: '/',
    filename: './main.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      hash: true,
    }),
  ],
};
