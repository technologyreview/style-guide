"use strict";

var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	nodemon = require('gulp-nodemon'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload');

// JS Lint
gulp.task('jshint', function () {
	gulp.src('*.js')
		.pipe(jshint())
});

// LESS compile
gulp.task('less', function () {
	gulp.src('./public/less/core.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less')],
			lint: true,
			compress: true
		}))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload());
});

// watch for changes
gulp.task('watch', function () {
	gulp.watch('./public/less/*.less', ['less']);
});

// nodemon: automatically reload env when files change
gulp.task('nodemon', function () {
	nodemon({
		script: 'app.js',
		ext: 'js twig',
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
gulp.task('default', ['jshint', 'nodemon', 'watch']);