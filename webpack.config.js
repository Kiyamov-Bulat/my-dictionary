const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  devtool: "eval-cheap-source-map",
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: 'index.tsx',
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, 'build'),
    clean: true,
    // publicPath: './',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './assets'),
      publicPath: '/assets'
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
    compress: true,
    client: {
      overlay: false,
      progress: true,
    },
  },
  optimization: {
    minimize: isProd,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      favicon: './assets/favicon/favicon.ico',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          }
        }],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/[name][ext][query]",
        },
      },
    ],
  },
  resolve: {
    alias: {
    },
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  }
};
