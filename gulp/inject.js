'use strict';

var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');
var fileinclude = require('gulp-file-include');
var through = require('through2');
var cheerio = require('cheerio');

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
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		// .pipe(gulp.dest(options.tmp + '/serve'))
		.pipe($.inject(injectStyles, injectOptions))

		//.pipe($.inject(injectScripts, injectOptions))
		.pipe(wiredep(wiredepOptions))
		.pipe(gulp.dest(options.tmp + '/serve'))
		.pipe(inlineCss({
				applyStyleTags: true,
				applyLinkTags: true,
				removeStyleTags: true,
				removeLinkTags: true
		}))
		.pipe(through.obj(function (file, enc, callback){
			var $ = cheerio.load(file.contents.toString(),{
	            decodeEntities: false
	        });
			$('*[class], *[id]').each(function(ind,e){
				if($(e).attr('class')) $(e).removeAttr('class');
				if($(e).attr('id')) $(e).removeAttr('id');
			});

			file.contents = new Buffer($.html());
			callback(null,file);
		}))
		.pipe(gulp.dest(options.tmp + '/serve'));
	});
};
