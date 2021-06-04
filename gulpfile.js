var gulp = require('gulp');

function html() {
    return gulp.src('*.html')
        .pipe(gulp.dest('public'));
};

function manifest() {
    return gulp.src('*.webmanifest')
        .pipe(gulp.dest('public'));
};

function sw() {
    return gulp.src('service-worker.min.js')
        .pipe(gulp.dest('public'));
};

function css() {
    return gulp.src('css/**/*.min.css')
        .pipe(gulp.dest('public/css'))
};

function js() {
    return gulp.src('js/**/*min.js')
        .pipe(gulp.dest('public/js'))
};

function views() {
    return gulp.src('views/**/*.+(html|min.js)')
        .pipe(gulp.dest('public/views'))
};

function ico() {
    return gulp.src('ico/**/*.*')
        .pipe(gulp.dest('public/ico'))
};

function img() {
    return gulp.src('img/**/*.*')
        .pipe(gulp.dest('public/img'))
};

function artwork() {
    return gulp.src('artwork/**/*.*')
        .pipe(gulp.dest('public/artwork'))
};

exports.default = gulp.parallel(html, manifest, sw, css, js, views, ico, img, artwork);