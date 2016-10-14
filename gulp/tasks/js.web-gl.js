module.exports = function() {
  $.gulp.task('js:web-gl', function() {
    return $.gulp.src($.path.webGl)
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
