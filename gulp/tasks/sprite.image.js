'use strict';

module.exports = function() {
  $.gulp.task('sprite:image', function() {
    var spriteData = $.gulp.src('./source/sprite/*.{png,gif}')
	    .pipe($.gp.spritesmith({
	    	imgName: 'sprite.png',
	    	cssName: 'sprite.css'
	  	 }));
  	 var imgStream = spriteData.img.pipe($.gulp.dest($.config.root +'/assets/img'));
  	 var cssStream = spriteData.css.pipe($.gulp.dest($.config.root +'/assets/css'));
  	 return ($.merge(imgStream, cssStream));
	})
};
