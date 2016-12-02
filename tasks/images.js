'use strict';

const gulp  = require('gulp');
const clean = require('gulp-clean');

module.exports = function(config) {
  return function(callback) {
    // first remove dist images
    gulp.src(config.outputPath)
      .pipe(clean({ force: true }))
        .on('finish', function(){
          // after removed, copy images, then callback
          gulp.src(config.inputPath)
            .pipe(gulp.dest(config.outputPath))
            .on('error', callback)
            .on('end', callback)
          ;
        })
      ;
  };
};
