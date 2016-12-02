'use strict';

const gulp        = require('gulp');
const config      = require('./config/gulp.js');
const runSequence = require('run-sequence').use(gulp);
const watch       = require('gulp-watch');

const tasks = {
  stylesheets:  require('./tasks/stylesheets')(config.stylesheets),
  icons:        require('./tasks/icons')(config.icons),
  scripts:      require('./tasks/scripts')(config.scripts),
  images:       require('./tasks/images')(config.images),
  fonts:        require('./tasks/fonts')(config.fonts),
};

gulp.task('scripts',     tasks.scripts);
gulp.task('stylesheets', tasks.stylesheets);
gulp.task('icons',       tasks.icons); // automatic stylesheets
gulp.task('images',      tasks.images);
gulp.task('fonts',       tasks.fonts);

gulp.task('default', function(callback){
  runSequence('build',
    'watch',
    callback);
});
gulp.task('build', [/*'scripts',*/ 'icons', 'fonts', 'images']);

gulp.task('watch', function() {
  watch(config.icons.watchPath,       function(){runSequence(['icons'])});
  watch(config.stylesheets.watchPath, function(){runSequence(['stylesheets'])});
  watch(config.scripts.watchPath,     function(){runSequence(['scripts'])});
  watch(config.images.watchPath,      function(){runSequence(['images'])});
  watch(config.fonts.watchPath,       function(){runSequence(['fonts'])});
});
