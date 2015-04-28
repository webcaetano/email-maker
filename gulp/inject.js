'use strict';

var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
	gulp.task('inject', ['styles'], function () {
	var injectStyles = gulp.src([
		options.tmp + '/serve/{styles,components}/**/*.css',
		'!' + options.tmp + '/serve/styles/vendor.css'
	], { read: false });


	var injectOptions = {
		ignorePath: [options.src, options.tmp + '/serve'],
		addRootSlash: false
	};

	var wiredepOptions = {
		directory: 'bower_components',
		exclude: [/jquery/]
	};

	return gulp.src(options.src + '/*.html')
		.pipe($.inject(injectStyles, injectOptions))
		//.pipe($.inject(injectScripts, injectOptions))
		.pipe(wiredep(wiredepOptions))
		.pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
		.pipe(gulp.dest(options.tmp + '/serve'));
	});
};
