var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var coffee = require('gulp-coffee');
var extreplace = require('gulp-ext-replace');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

var paths = {
  sass: ['./scss/**/*.scss', './scripts/modules/**/**/*.scss'],
  coffee: ['./scripts/*.coffee','./scripts/**/*.coffee'],
  jade: ['./scripts/modules/**/views/*.jade'],
  img: ['./scripts/modules/**/*.{ico,png,jpg,svg}']
};

require('require-dir')('./gulp');

gulp.task('default', function () {
    gulp.start('serve');
});

gulp.task('build', ['coffee','sass','jade','img']);

gulp.task('injectstyle', function() {
  return gulp.src('scss/*.scss')
    .pipe(plumber())
    .pipe($.inject(gulp.src(['scripts/modules/**/*.scss','!scripts/modules/**/_scss/*.scss'], {read: false}), {
      starttag: '// inject:styles',
      endtag: '// endinject',
      addRootSlash: false,
      ignorePath: '',
      addPrefix: '..',
      transform: function (filepath, file, i, length) {
        return '@import "' + filepath + '";';
      }
    }))
    .pipe(gulp.dest('./scss'));
});

gulp.task('injectcoffee', function() {
  return gulp.src('scripts/app.coffee')
    .pipe(plumber())
    .pipe($.inject(gulp.src(['scripts/modules/**/*.{controller,service,config}.{coffee,js}'], {read: false}), {
      starttag: '# inject:controllers',
      endtag: '# endinject',
      addRootSlash: false,
      ignorePath: 'scripts/',
      addPrefix: '.',
      transform: function (filepath, file, i, length) {
        return 'require "' + filepath + '"';
      }
    }))
    .pipe(gulp.dest('./scripts'));
});

gulp.task('coffee', ['injectcoffee'], function () {
  return gulp.src('./scripts/app.coffee', {read:false})
      .pipe(plumber())
      .pipe(browserify({
        transform: ['coffeeify'],
        extensions: ['.coffee']          
      }))
      .pipe(extreplace('.js'))
      .pipe(gulp.dest("./www/js/"))
});

gulp.task('jade', function () {
  return gulp.src('./scripts/modules/**/**/*.jade')
      .pipe(plumber())
      .pipe($.jade())
      .pipe(gulp.dest("./www/templates/"))
});

gulp.task('sass', ['injectstyle'], function(done) {
  $.rubySass('scss',{compass: true, sourcemap: true, style: 'compressed', loadPath : __dirname})
    .pipe(plumber())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('img', function () {
  return gulp.src(['./scripts/modules/**/*.{ico,png,jpg,svg}'])
      .pipe(plumber())
      .pipe(gulp.dest('./www/img/'))
});

gulp.task('watch', ['coffee','sass','jade','img'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.img, ['img']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
