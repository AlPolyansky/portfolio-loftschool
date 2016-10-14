'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js'),
    webGl : require('./gulp/paths/webGL.js'),
  },
  gulp: require('gulp'),
  rimraf: require('rimraf'),
  merge: require('merge-stream'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'pug',
    'js:foundation',
    'js:process',
    'js:web-gl',
    'copy:image',
    'css:foundation',
    'sprite:svg',
    'sprite:image',
    'copy'

  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));