const merge = require('webpack-merge'),
  common = require('./webpack.common.js'),
  webpack = require('webpack'),
  CompressionPlugin = require('compression-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  CssNano = require('cssnano');


module
.
exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: CssNano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          },
          safe: true
        },
        canPrint: false
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 25000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-bootstrap|styled-components)[\\/]/,
          enforce: true,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 8192,
      minRatio: 0.8
    })
  ],
});
