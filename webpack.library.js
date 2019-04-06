const webpack = require('webpack');

module.exports = {
  context: process.cwd(),
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less', '.css'],
    modules: [__dirname, 'node_modules']
  },

  entry: {
    library: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'styled-components',
      'react-bootstrap',
      'mongoose'
    ]
  },
  output: {
    filename: '[name].dll.js',
    path: __dirname + '/dist/library',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: './dist/library/[name].json'
    })
  ]
};