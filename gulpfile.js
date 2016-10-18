var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer	= require('gulp-autoprefixer');
var del = require('del');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var svgSprite = require('gulp-svg-sprite');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var notify = require('gulp-notify');



// target server

target = false;

// Path

var path = {
	sourse : 'sourse',
	build : 'build',
	buildAssets : 'assets',
	pug :  'template/pages',
	sass : 'style',
	js: 'js',
	css: 'css',
	sourseImg : 'images'
};


var sassCompile = [
		path.sourse  + '/' + path.sass + '/app.scss',
		path.sourse  + '/' + path.sass + '/admin.scss',
]

var scssLibs = [
	'bower_components/normalize-css/normalize.css',
]

var jsLibs = [
	'bower_components/jquery/dist/jquery.js',
]


// Pug folder

var pugFolders = [
	path.sourse + '/' + path.pug + '/*.pug',
]

// JS files

var appJs = [
		path.sourse + '/' + path.js + '/modules/_base.js',
		path.sourse + '/' + path.js + '/modules/_common.js',
		path.sourse + '/' + path.js + '/modules/_menu.js',
		path.sourse + '/' + path.js + '/modules/_sidebar.js',
		path.sourse + '/' + path.js + '/modules/_form.js',
		path.sourse + '/' + path.js + '/modules/_slider.js',
		path.sourse + '/' + path.js + '/modules/_skills.js',
		path.sourse + '/' + path.js + '/modules/_map.js',
		path.sourse + '/' + path.js + '/modules/_preloader.js',
		path.sourse + '/' + path.js + '/app.js',
	]

var waterJs = [
	path.sourse + '/' + path.js + "/water.js",
]

var adminJs = [
	path.sourse + '/' + path.js + '/admin.js',
]





// Pug
gulp.task('pug', function(){
 	return gulp.src(pugFolders)
  	.pipe(pug(
  		{pretty: true}
  	))
  	.on('error', notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        }
     }))
  	.pipe(gulp.dest(path.build))
});


// Sass 
gulp.task('sass',function(){
	return gulp.src(sassCompile)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded',errLogToConsole: true})).on('error', notify.onError({ title: 'Style' }))
		.pipe(autoprefixer(['last 15 versions'],{cascade : true}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build + '/' + path.buildAssets + '/' + path.css))
		.pipe(browserSync.stream())
});


// Clear

gulp.task('clean',function(){
	return del(path.build);
})

// CSS libs

gulp.task('css-libs', function(){
	return gulp.src(scssLibs)
	.pipe(concat('foundation.css'))
	.pipe(csso('foundation.css'))
	.pipe(gulp.dest(path.build + "/" + path.buildAssets + "/" +  path.css ))
})

// Js libs

gulp.task('js-libs', function(){
	return gulp.src(jsLibs)
	.pipe(concat('foundation.js'))
	.pipe(uglify('foundation.js'))
	.pipe(gulp.dest(path.build + "/" + path.buildAssets + "/" +  path.js ))
})


// SVG 
gulp.task('svg-sprite', function(){
	return gulp.src(path.sourse + '/sprite/*.svg')
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        }
      }))
      .pipe(gulp.dest(path.build + '/assets/img'))
})

// Copy 

gulp.task('copy', function(callback){

	// Fonts
	gulp.src(path.sourse + '/fonts/**/*')
	.pipe(gulp.dest(path.build + '/' + path.buildAssets + '/fonts'));

	// img

	gulp.src(path.sourse + '/'+ path.sourseImg +'/**/*')
		.pipe(gulp.dest(path.build + "/" + path.buildAssets + "/img"))

	// Other

	gulp.src([
		path.sourse + '/other/**/*'
	])
	.pipe(gulp.dest(path.build + '/' + path.buildAssets + '/other'));

	callback();

})


// Concat Js

gulp.task('concat', function(callback){

	// app.js
	gulp.src(appJs)
		.pipe(concat("app.js"))
		.pipe(gulp.dest(path.build + '/' + path.buildAssets + '/' + path.js))

	// water.js
	gulp.src(waterJs)
		.pipe(concat("water.js"))
		.pipe(gulp.dest(path.build + '/' + path.buildAssets + '/' + path.js))

	// water.js.map
	gulp.src(path.sourse + '/' + path.js + "/water.js.map")
		.pipe(gulp.dest(path.build + '/' + path.buildAssets + '/' + path.js))

	// admin.js
	gulp.src(adminJs)
		.pipe(concat("admin.js"))
		.pipe(gulp.dest(path.build + '/' + path.buildAssets + '/' + path.js))

	callback();


})


// lint

gulp.task('js-lint', function() {
    return gulp.src(path.sourse + '/js/**/*.js')
      .pipe(eslint())
      .pipe(eslint.format());
  })


// Server

gulp.task('server',function(){
	browserSync.init({
      open: target,
      server: path.build,
      notify: false
    });
});


// Watch

gulp.task('watch',function(){
		gulp.watch(path.sourse +  '/**/*.scss', gulp.series('sass'));
		gulp.watch(path.sourse +  '/template/**/*.pug', gulp.series('pug','reload'));
		gulp.watch(path.sourse +  '/js/**/*.js', gulp.series('concat','reload'));
})

gulp.task('reload',function(cb){
	browserSync.reload();
	cb();
})


// Build

gulp.task('build', gulp.series(
	
	'pug',
	'sass',
	'css-libs',
	'js-libs',
	'concat',
	'svg-sprite',
	'copy'
));


gulp.task('default', gulp.series('clean',gulp.parallel('build'), gulp.parallel('watch','server')));