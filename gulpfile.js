'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var inlineCss = require('gulp-inline-css');


gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('default', function() {
    return gulp.src('./*.html')
        .pipe(inlineCss({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: false,
            removeLinkTags: true,
            removeHtmlSelectors: true
        }))
        .pipe(gulp.dest('build/'));
});