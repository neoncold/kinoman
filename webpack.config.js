const path = require('path');
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
  ],
};