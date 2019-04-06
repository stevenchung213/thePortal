const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WebpackPwaManifest = require('webpack-pwa-manifest'),
  AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');


module.exports = {
  entry: {
    app: [
      '@babel/polyfill',
      './src/index.js'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            "react-hot-loader/babel",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-syntax-dynamic-import"
          ],
          cacheDirectory: true,
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: '[name].[ext]'
          }
        }
      }
    ],
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./dist/library/library.json'),
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: require('html-webpack-template'),
      inject: false,
      mobile: true,
      cache: true,
      minify: true,
      title: 'the.Portal',
      meta: [
        {
          charset: 'UTF-8'
        },
        {
          name: 'author',
          content: 'Steven Chung'
        },
        {
          name: 'description',
          content: 'Save your favorite images and access them anywhere'
        }
      ],
      links: [
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      ],
      appMountId: 'root',
      bodyHtmlSnippet: `<noscript>Please enable JavaScript...</noscript>`,
      scripts: []
    }),
    new WebpackPwaManifest({
      inject: true,
      filename: './assets/manifest.json',
      name: 'the.Portal',
      short_name: 'the.Portal',
      description: 'Save your favorite images and access them anywhere',
      display: 'standalone',
      start_url: 'index.html',
      theme_color: '#ffffff',
      background_color: '#000000',
      crossorigin: null,
      icons: [
        {
          src: './src/assets/profile.png',
          sizes: [512],
          destination: '/assets'
        }
      ],
    }),
    // new AddAssetHtmlPlugin({
    //   filepath: path.resolve(__dirname, './dist/library/*.dll.js'),
    //   includeSourcemap: false // add this parameter
    // })
  ],
};