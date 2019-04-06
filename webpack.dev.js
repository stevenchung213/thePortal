const merge = require('webpack-merge'),
  common = require('./webpack.common.js'),
  webpack = require('webpack');

module.exports = merge(common, {
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  mode: 'development',
  devtool: 'eval',
  cache: true,
  performance: {
    hints: false
  },
  output: {
    pathinfo: true
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    nodeEnv: 'development',
    flagIncludedChunks: false,
    occurrenceOrder: false,
    sideEffects: false,
    usedExports: false,
    concatenateModules: false,
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    noEmitOnErrors: false,
    checkWasmTypes: false,
    minimize: false,
  },
  devServer: {
    hot: true,
    port: 3000,
    contentBase: __dirname + '/dist',
    historyApiFallback: true, // Allow refreshing of the page
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.HotModuleReplacementPlugin(), // Enable hot reloading
  ]
});
