'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var cheerio = require('cheerio');
var fs = require("fs");

var util = require('util');

var middleware = require('./proxy');

module.exports = function(options) {

	function browserSyncInit(baseDir, browser) {
		browser = browser === undefined ? 'default' : browser;

		var routes = null;
		if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
			routes = {
				'/bower_components': 'bower_components'
			};
		}

		var server = {
			baseDir: baseDir,
			routes: routes
		};

		if(middleware.length > 0) {
			server.middleware = middleware;
		}

		browserSync.instance = browserSync.init({
			startPath: '/',
			server: server,
			browser: browser
		});
	}

	gulp.task('serve', ['inject','watch'], function () {
		browserSyncInit([options.tmp + '/serve', options.src]);
	});

	gulp.task('serve:dist', ['build'], function () {
		browserSyncInit(options.dist);
	});

	gulp.task('test', [], function () {
		var nodemailer = require('nodemailer');
		var obj = JSON.parse(fs.readFileSync('./.gmail-credentials.json', 'utf8'));
		console.log(obj);
		// create reusable transporter object using SMTP transport
		// var transporter = nodemailer.createTransport({
		// 	service: 'Gmail',
		// 	auth: {
		// 		user: 'gmail.user@gmail.com',
		// 		pass: 'userpass'
		// 	}
		// });
		var $ = cheerio.load(fs.readFileSync(options.src + '/template.html'));
		console.log($.html())
	});
};
