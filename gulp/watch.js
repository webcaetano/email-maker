'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
	return event.type === 'changed';
}

module.exports = function(options) {
	gulp.task('watch', [], function () {

		gulp.watch([
				options.src + '/*.html',
				options.src + '/{components,styles}/**/*.css',
				options.src + '/{components,styles}/**/*.scss',
				'bower.json'
			],function(){
			gulp.start('inject',function(){
				browserSync.reload();
			});
		});


		gulp.watch(options.src + '/{styles,components}/**/*.html', function(event) {
			browserSync.reload(event.path);
		});
	});
};
