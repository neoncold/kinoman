const path = require('path');
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const CopyPlugin = require('copy-webpack-plugin');
const { SourceMap } = require('module');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{from: "public"}],
    }),
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 9000,
    liveReload: true,
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        }
    ]
  }
};