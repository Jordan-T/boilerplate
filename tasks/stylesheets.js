'use strict';

const gulp     = require('gulp');
const postcss  = require('gulp-postcss');
const sass     = require('gulp-sass');
const notify   = require('gulp-notify');
const notifier = require('node-notifier');
const plumber  = require('gulp-plumber');
const connect  = require('gulp-connect');
const minify   = require('gulp-clean-css');
const DEV      = process.argv.indexOf('--dev') != -1;

/*
POSTCSS modules
 */
const stylelint    = require('stylelint');
const reporter     = require('postcss-reporter');
const mqpacker     = require('css-mqpacker');
const autoprefixer = require('autoprefixer');

const notifyMessage = {
  title: 'TASK ERROR',
  message: 'CSS build FAIL : <%= file.relative %>',
  wait: false,
  time: 3000,
};

module.exports = function(config) {
  return function() {
    // @TODO: set stylelint !
    const postCSSPlugins = postcss([
      // stylelint,
      reporter({ clearMessages: true }),
      mqpacker,
      autoprefixer(),
    ]);

    var stream = gulp.src(config.inputPath)
      .pipe(plumber({
        errorHandler(err) {
          console.log(err);
          notifier.notify(notifyMessage);
          this.emit('end');
        }
      }))
      .pipe(sass())
      .pipe(postCSSPlugins);

    if (!DEV) {
      stream.pipe(minify());
    }

    return stream.pipe(gulp.dest(config.outputPath))
      .pipe(connect.reload())
      .pipe(notify('Stylesheets build done : <%= file.relative %>'));
  };
};
