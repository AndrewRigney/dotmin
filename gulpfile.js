const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const rename = require('gulp-rename');

//Start series
function clean() {
    return del(['public']);
};

//Start parallel
function html() {
    return gulp
        .src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            useShortDoctype: true,
            removeComments: true,
            minifyCSS: true
        }
        ))
        .pipe(gulp.dest('public'));
};

function manifest() {
    return gulp
        .src('*.webmanifest')
        .pipe(gulp.dest('public'));
};

function sw() {
    return gulp
        .src('service-worker.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public'));
};

function css() {
    return gulp
        .src('css/**/*.css')
        .pipe(concat('app.min.css'))
        .pipe(postcss([cssnano({ discardComments: { removeAll: true } })]))
        .pipe(gulp.dest('public/css'));
};

function js() {
    return gulp
        .src(['js/core-service.js',
            'js/app.js',
            'js/service-worker.js'])
        .pipe(concat('bundle.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('public/js'));
};

function vendorJs() {
    return gulp
        .src('js/vendor/*.js')
        .pipe(gulp.dest('public/js/vendor'))
};

function models() {
    return gulp
        .src('js/models/**/*.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/js/models'))
};

function views() {
    return gulp
        .src('views/**/*.html')
        .pipe(gulp.dest('public/views'))
};

function viewControllers() {
    return gulp
        .src('views/controllers/**/*.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/views/controllers'))
};

function controllers() {
    return gulp
        .src('js/controllers/**/*.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/js/controllers'))
};

function ico() {
    return gulp
        .src('ico/**/*.*')
        .pipe(gulp.dest('public/ico'))
};

function img() {
    return gulp
        .src('img/**/*.*')
        .pipe(gulp.dest('public/img'))
};

function artwork() {
    return gulp
        .src('artwork/**/*.*')
        .pipe(gulp.dest('public/artwork'))
};
//End parallel
//End series

exports.default = gulp.series(clean, gulp.parallel(html, manifest, sw, css, js, vendorJs, models, views, viewControllers, controllers, ico, img, artwork));