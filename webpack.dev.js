const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    port: 3000,
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true, // Allow refreshing of the page
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable hot reloading
  ]
});