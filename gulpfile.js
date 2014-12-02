"use strict";

var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	rename = require('gulp-rename'),
	nodemon = require('gulp-nodemon'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglifyjs'),
	install = require('gulp-install');

// install package dependencies
gulp.task('install', function () {
	gulp.src(['./bower.json', './package.json'])
		.pipe(install());
});

// jshint
gulp.task('jshint', function () {
	gulp.src('./*.js')
		.pipe(jshint())
});

// concatenate and minify client-side JS
gulp.task('uglify', function () {
	gulp.src('./public/js/*.js')
		.pipe(gulp.dest('./dist/js'))
		.pipe(rjs({
			baseUrl: 'dist/js'
		}))
		.pipe(livereload());
});

// compile LESS
gulp.task('less', function () {

	// core.less
	gulp.src('./public/less/core.less')
		.pipe(less({
			lint: true,
			compress: true
		}))
		.pipe(gulp.dest('./public/dist'))
		.pipe(livereload());
});

// watch for file changes
gulp.task('watch', function () {
	gulp.watch('./public/less/*.less', ['less']);
	//gulp.watch('./public/js/*.js', ['require-uglify']);
});

// nodemon: automatically reload env when files change
gulp.task('nodemon', function () {
	nodemon({
		script: 'app.js',
		ext: 'js html',
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
gulp.task('default', ['nodemon', 'watch', 'install']);