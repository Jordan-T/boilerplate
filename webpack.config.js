'use strict';

const webpack = require('webpack');
const path    = require('path');
const fs      = require('fs');
const files   = fs.readdirSync('./src/views');
const DEV     = process.argv.indexOf('--dev') != -1;
let entries   = {};

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.bundle.js');
const uglifyPlugin  = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
});

let plugins = [commonsPlugin];

!DEV ? plugins.push(uglifyPlugin) : null;

files.forEach(file => {
  if (file != 'base') {
    entries[file] = `./src/views/${file}/index.js`;
  }
});

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, './dist/javascripts'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js'],
  },
  plugins,
};
