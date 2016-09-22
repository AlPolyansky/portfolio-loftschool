var 
	gulp = require('gulp'),
	concatCss = require('gulp-concat-css'), // Склеиваем css файлы  !!!!
	cleanCSS = require('gulp-clean-css'), // Минифицируем css
	rename = require("gulp-rename"), // Переименовываем файлы
	notify = require('gulp-notify'),//Уведомление
	autoprefixer	= require('gulp-autoprefixer'), // autoprefixer
	sass = require('gulp-sass'),// SASS
	browserSync = require('browser-sync'), //BrowserSync (livereload и тд)
	concat = require('gulp-concat'), // Склеивает файлы js
	uglify = require('gulp-uglifyjs'),  // Сжимаем js
	jade = require('gulp-jade'), // препроцессор JADE
	pug = require('pug'), // препроцессор JADE
	imageMin = require('gulp-imagemin'), // сжимаем image
	del = require('del'), // Удаляет выбранный файл, папку
	zip = require('gulp-zip'); // создает ZIP архив



// JS Libs path

var 
libsJs = {
	jquery : "src/libs/jquery/dist/jquery.min.js",
	modernizer : "src/libs/modernizer/modernizr.js",
	flickity : "src/libs/flickity/dist/flickity.pkgd.js",
	picturefill : "src/libs/picturefill/dist/picturefill.min.js",
	jqPlaceholder : "src/libs/jquery-placeholder/jquery.placeholder.js",
},

// CSS Libs path
libsCss = {
	resetCss : "src/libs/reset-css/reset.css",
	flickity : "src/libs/flickity/dist/flickity.css"
	
}



// Clear dist

gulp.task('clear',function(){
	return del.sync('dist');
})


// Pug
gulp.task('pug', function(){
 	gulp.src('src/jade/*.jade')
  	.pipe(pug(
  		{pretty: true}
  	))
  	.on('error', console.log)
  	.pipe(gulp.dest('src/'))
});

// Jade

gulp.task('jade', function(){
 	gulp.src('src/jade/*.jade')
  	.pipe(jade(
  		{pretty: true}
  	))
  	.on('error', console.log)
  	.pipe(gulp.dest('src/'))
});




// SASS

gulp.task('sass',function(){
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}))
		.on('error', sass.logError)
		.pipe(autoprefixer(['last 15 versions'],{cascade : true}))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream: true}))
});


// Compress


gulp.task("compress" , ['clear','sass','css-libs','script', 'image', 'jade'],function(){
	gulp.src('src/css/**/*.css')
		.pipe(concat("main.css"))
		.pipe(cleanCSS())
		.pipe(rename("main.min.css"))
		.pipe(gulp.dest("dist/css"))

	gulp.src('src/js/**/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(rename("script.min.js"))
		.pipe(gulp.dest('dist/js'))
})


// Image min

gulp.task('image',function(){
	gulp.src('src/img/**/*')
		.pipe(imageMin())
		.pipe(gulp.dest('dist/img'))
})



// Create libs.js

gulp.task('script', function(){
	return gulp.src([
		libsJs.jquery,
		libsJs.modernizer,
		libsJs.flickity,
		libsJs.picturefill,
		libsJs.jqPlaceholder,
	])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest("src/js"))
})

// Create libs.css

gulp.task('css-libs', function(){
	return gulp.src([
		libsCss.resetCss,
		libsCss.flickity
	])
	.pipe(concat('libs.css'))
	.pipe(gulp.dest('src/css'))
})


// Browser-sync

gulp.task('browser-sync',function(){
	browserSync({
		server: {
			baseDir : 'src'
		},
		notify: false

	});
});


// gulp Dist

gulp.task('dist', ['clear','image'] , function(){

	gulp.src("src/css/*.css")
		.pipe(gulp.dest("dist/css"));

	gulp.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"));

	gulp.src("src/*.html")
		.pipe(gulp.dest("dist/"));

	gulp.src("src/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"));

	gulp.src("dist")
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest('dist'))
});



// gulp Build

gulp.task('build', ['compress'] ,function(){
	gulp.src("src/*.html")
		.pipe(gulp.dest("dist/"));
	gulp.src("src/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"));
})


gulp.task('watch',  ['css-libs','script','browser-sync'], function(){
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/jade/**/*.jade', ['jade'], browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);

})


gulp.task('default', ["watch"] ,function(){

})


