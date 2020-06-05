const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },


    contentBase: path.resolve(__dirname, './client'),
    host: 'localhost',
    port: 8080,
    hot: true,
    publicPath: '/dist/',
    historyApiFallback: true,
    proxy: {
      '*':  {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/roasters*':  {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/api/roasters*':  {
        target: 'http://localhost:3000/',
        secure: false,
      },

      changeOrigin: true,

      secure: false,
    },
    inline: true,


  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};