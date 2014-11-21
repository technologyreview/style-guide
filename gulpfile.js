"use strict";

var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	rename = require('gulp-rename'),
	nodemon = require('gulp-nodemon'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglifyjs');

// jshint
gulp.task('jshint', function () {
	gulp.src('./*.js')
		.pipe(jshint())
});

// concatenate and minify client-side JS
gulp.task('uglify', function () {
	gulp.src([
		'./public/js/jquery-1.11.1.js',
		'./public/js/jquery.browser.js',
		'./public/js/jquery.hashchange.js',
		'./public/js/twig.js',
		'./public/js/front.js'
	])
		.pipe(uglify('build.js'))
		.pipe(gulp.dest('./public/dist'))
		.pipe(livereload());
});

// compile LESS
gulp.task('less', function () {
	gulp.src('./public/less/core.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less')],
			lint: true,
			compress: true
		}))
		.pipe(rename('build.css'))
		.pipe(gulp.dest('./public/dist'))
		.pipe(livereload());
});

// watch for file changes
gulp.task('watch', function () {
	gulp.watch('./public/less/*.less', ['less']);
	gulp.watch('./public/js/*.js', ['uglify']);
});

// nodemon: automatically reload env when files change
gulp.task('nodemon', function () {
	nodemon({
		script: 'app.js',
		ext: 'js twig',
		ignore: ['public/*'],
		nodeArgs: ['--debug'],
		env: {
			'NODE_ENV': 'development'
		}
	})
		.on('change', ['jshint'])
		.on('restart', function () {
			console.log('restart');
		});
});

// runtime
gulp.task('default', ['nodemon', 'watch']);