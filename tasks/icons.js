'use strict';

const gulp        = require('gulp');
const iconfont    = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const rename      = require('gulp-rename');
const runSequence = require('run-sequence').use(gulp);

module.exports = function(config) {
  return function(callback) {
    let ended = 0;
    const numberStream = 3;
    const callBackAtEnd = function() {
      if(++ended === numberStream && typeof callback === 'function') {
        // force stylesheets
        runSequence('stylesheets', callback);
      }
    };

    gulp.src(config.inputPath)
      .pipe(iconfont({
        fontName: config.fontName,
        formats: config.formats,
      }))
      .on('glyphs', function(glyphs) {
        const options = {
          glyphs: glyphs.map(function(glyph) {
            return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() };
          }),
          fontVersion: (typeof config.version === 'function') ? config.version() : config.version,
          fontName: config.fontName,
          fontPath: config.fontPathCSS,
        };

        // the exemple
        gulp.src(config.exemplePath)
          .pipe(consolidate('lodash', options))
          .pipe(gulp.dest(config.exempleOutputPath))
          .on('end', callBackAtEnd)
        ;

        // the generated scss
        gulp.src(config.templatePath)
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: config.outputFileName }))
          .pipe(gulp.dest(config.templateOutputPath))
          .on('end', callBackAtEnd)
        ;
      })
      .pipe(gulp.dest(config.outputPath))
      .on('end', callBackAtEnd)
    ;
  }
};
