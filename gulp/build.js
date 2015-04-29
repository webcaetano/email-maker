'use strict';

var gulp = require('gulp');
var cheerio = require('cheerio');
var through = require('through2');
var fs = require("fs");

var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
	gulp.task('build',['clean','inject'],function () {
		return gulp.src(options.tmp + '/serve/index.html')
		.pipe(through.obj(function (file, enc, callback){
			file.contents = new Buffer(cheerio.load(file.contents.toString())('.email-template').html());
      		callback(null, file);
		}))
		.pipe($.minifyHtml())
		.pipe(gulp.dest(options.dist + '/'))
		.pipe($.size({ title: options.dist + '/', showFiles: true }));
	});

	gulp.task('clean', function (done) {
		$.del([options.dist + '/', options.tmp + '/'], done);
	});
};


