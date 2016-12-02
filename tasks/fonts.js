'use strict';

const gulp  = require('gulp');

module.exports = function(config) {
  return function() {
    return gulp.src(config.inputPath)
      .pipe(gulp.dest(config.outputPath));
  };
};
