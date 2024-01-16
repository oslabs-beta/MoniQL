const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: "production",
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env', { targets: 'defaults' }],
              ['@babel/react'],
            ],
          },
        }, 
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|cur)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development',
      template: 'client/index.html',
      publicPath: '/',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    // disables the full-screen overlay that displays build errors
    // uncomment while styling
    client: {
      overlay: false,
    },

    static: {
      publicPath: '/build',
      directory: path.join(__dirname, 'build'),
    },
    proxy: { '/': 'http://localhost:3000' }, //added this to do postman requests
    port: 8080,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};