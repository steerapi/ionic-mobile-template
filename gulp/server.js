'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;

  browserSync.instance = browserSync.init(files, {
    startPath: '/index.html',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser,
    port: 3001
  });

}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    'www'
  ], [
    'www/css/*.css',
    'www/js/*.js',
    'www/lib/**/*.js',
    'www/libs/**/*.js',
    'www/templates/**/**/*.html'
  ]);
});
