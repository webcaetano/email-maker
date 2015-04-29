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

	function sendEmail(html){
		var nodemailer = require('nodemailer');
		var gmailCredentials = JSON.parse(fs.readFileSync('./.gmail-credentials.json', 'utf8'));

		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: gmailCredentials
		});

		var mailOptions = {
			from: gmailCredentials.user, // sender address
			to: gmailCredentials.user, // list of receivers
			subject: 'Test Email Template  ✔', // Subject line
			html:html
		};

		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
			}else{
				console.log('Message sent: ' + info.response);
			}
		});
	}

	gulp.task('serve', ['inject','watch'], function () {
		browserSyncInit([options.tmp + '/serve', options.src]);
	});

	gulp.task('test:dist', ['build'], function () {
		sendEmail(cheerio.load(fs.readFileSync(options.dist + '/index.html')).html());
	});

	gulp.task('test', [], function () {
		gulp.start('inject',function(){
			sendEmail(cheerio.load(fs.readFileSync(options.tmp + '/serve/index.html'))('.email-template').parent().html());
		});
	});
};
