/*global includePaths*/
/*jslint node: true*/

let gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  del = require('del'),
  cache = require('gulp-cache'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('gulp-autoprefixer'),
  svgstore = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin'),
  bourbon = require('node-bourbon'),
  ftp = require('vinyl-ftp'),
  sourcemaps = require('gulp-sourcemaps'),

  notify = require("gulp-notify");

// Скрипты проекта
gulp.task('scripts', function () {
  'use strict';
  return gulp.src(
    'app/js/common.js'
  )
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
  'use strict';
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('sass', function () {
  'use strict';
  return gulp.src('app/sass/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({
        includePaths: bourbon.includePaths
      }).on("error", notify.onError()))
      .pipe(plumber())
      .pipe(sass().on("error", notify.onError()))
      .pipe(rename({suffix: '.min', prefix: ''}))
      .pipe(autoprefixer(['last 15 versions']))
      .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', gulp.parallel('sass', 'scripts', 'browser-sync', function () {
  'use strict';
  gulp.watch('app/sass/**/*.{sass,scss}', gulp.parallel('sass'));
  gulp.watch('app/js/common.js', gulp.parallel('scripts'));
  gulp.watch('app/*.html', browserSync.reload);
}));

gulp.task('symbols', function () {
  'use strict';
  return gulp.src("app/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('app/img'));
});

gulp.task('removedist', function (done) {
  'use strict';
  del.sync('dist');
  done();
});

gulp.task('build', gulp.series('removedist', 'sass', 'scripts', function () {
  'use strict';
  return gulp.src(
    'app/*.html',
    'app/.htaccess'
    ).pipe(gulp.dest('dist')),
    gulp.src(
      'app/css/main.min.css'
    ).pipe(gulp.dest('dist/css')),
    gulp.src(
      'app/libs/**/*'
    ).pipe(gulp.dest('dist/libs')),
    gulp.src(
      'app/js/scripts.min.js'
    ).pipe(gulp.dest('dist/js')),
    gulp.src(
      'app/fonts/**/*'
    ).pipe(gulp.dest('dist/fonts'));
}));

gulp.task('clearcache', function () {
  'use strict';
  return cache.clearAll();
});

gulp.task('default', gulp.parallel('watch'));
