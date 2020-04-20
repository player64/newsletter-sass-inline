'use strict';

const gulp = require('gulp')
const sass = require('gulp-sass')
const inlineCss = require('gulp-inline-css')
const browserSync = require('browser-sync').create()

function scss() {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
}
exports.scss = gulp.series(scss)


gulp.task('scss:watch', (done) => {
    gulp.watch('./app/sass/**/*.scss', gulp.series('scss'))
    done()
});

function copy_images() {
    return gulp.src('./app/img/**/*')
        .pipe(gulp.dest('./build/img'))
}

function inline_css() {
    return gulp.src('./app/*.html')
        .pipe(inlineCss({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: false,
            removeLinkTags: true,
            removeHtmlSelectors: false
        }))
        .pipe(gulp.dest('./build'))
}
exports.default = gulp.series(copy_images, scss, inline_css)

gulp.task('serve', gulp.series(copy_images, scss, inline_css, (done) => {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    })
    const watched_files = ['./app/img/**/*', './app/*.html','./app/sass/**/*.scss']

    gulp.watch(watched_files, gulp.series('default'))
    gulp.watch(watched_files).on('change', browserSync.reload)
    done()
}))
