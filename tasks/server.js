'use strict';

const connect = require('gulp-connect');

module.exports = function(config) {
  return function() {
    connect.server({
      root: config.root,
      livereload: true,
    });
  };
};
