var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	less = require('gulp-less'),
	jshint = require('gulp-jshint'),
	path = require('path');

// LESS compile
gulp.task('less', function () {
	gulp.src('./public/less/core.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less')],
			lint: true,
			compress: true
		}))
		.pipe(gulp.dest('./public/css'));
});

// JS Lint
gulp.task('lint', function () {
	gulp.src('./**/*.js')
		.pipe(jshint())
});

// Nodemon: automatically reload env when files change
gulp.task('develop', function () {
	nodemon({
		script: 'app.js',
		ext: 'html js css'
	})
		.on('change', ['lint'])
		.on('restart', function () {
			console.log('Restarted!')
		})
});

gulp.task('default', ['less', 'lint', 'develop']);