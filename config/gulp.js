'use strict';

const path = require('path');
const basePath = {
  src: './src/',
  dist: './dist/'
};

const config = {
  stylesheets: {
    inputPath: [
      path.normalize('src/assets/stylesheets/common.scss'),
      'src/views/**/*.scss'
    ],
    outputPath: path.join(__dirname, '../dist/stylesheets'),
    watchPath: ['./src/**/*.scss'],
  },
  icons: {
    inputPath: './src/assets/icons/**/*.svg',
    outputPath: path.join(__dirname, '../dist/fonts'),
    outputFileName: '_icons',
    formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
    watchPath: [],
    fontName: 'icons',
    fontVersion: () => (new Date()).toISOString().slice(0,19),
    fontPathCSS: '../fonts/',

    templatePath: path.join(__dirname, '../src/assets/stylesheets/icons/_template.scss'),
    templateOutputPath: path.join(__dirname, '../src/assets/stylesheets/icons'),
    exemplePath: path.join(__dirname, './icons-font.html'),
    exempleOutputPath: path.join(__dirname, '../dist'),
  },
  scripts: {
    watchPath: 'src/**/*.js',
  },
  jsdoc: {
    inputPath: ['README.md'],
    outputPath: path.join(__dirname, '../docs'),
  },
  server: {
    host: 'localhost',
    port: 9001,
    root: path.join(__dirname, '../dist'),
  },
  images: {
    inputPath: 'src/assets/images/**/*',
    outputPath: path.join(__dirname, '../dist/images'),
    watchPath: 'src/assets/images/**/*',
  },
  fonts: {
    inputPath: 'src/assets/fonts/**/*',
    outputPath: path.join(__dirname, '../dist/fonts'),
    watchPath: 'src/assets/fonts/**/*',
  },
};

// = SPECIFIC
// add icons watch
config.icons.watchPath.push(config.icons.inputPath);
config.icons.watchPath.push(config.icons.templatePath);

// remove icons of stylesheets.watchPath
config.stylesheets.watchPath.push(`!${config.icons.templatePath}`);
config.stylesheets.watchPath.push(`!${config.icons.templateOutputPath}/${config.icons.outputFileName}.scss`);

module.exports = config;
